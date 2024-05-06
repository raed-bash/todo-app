import { memo, useCallback, useEffect, useState } from "react";
import usePaginationScrollAutoComlpete from "../../hooks/use-pagination-scroll";
import Autocomplete from "../autocomplete/Autocomplete";
import {
  AutocompleteChangeReason,
  AutocompleteRenderOptionState,
  TextFieldProps,
} from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { TextFieldHandler } from "../text-field-handler";

export type Query = {
  search: string;
  page: number;
  moreData: boolean | undefined;
};

export type Data<T> = {
  data: T[];
  meta: { total: number; currentPage: number; next: number };
};

export type AutocompleteHandlerProps<T extends any> = TextFieldProps & {
  getOptionLabel: (option: T) => string;
  renderOption: (option: T) => string;
  loadItemsAsync: (
    query: Query,
    success: (data: Data<T>) => void,
    fail: () => void
  ) => () => void;
  onChange?: (value: T) => void;
  onChangeStr?: (value: string) => void;
  onClear?: (value: string) => void;
  dependencyList?: [];
  defaultValue?: Object | string | null;
  disabled?: boolean;
  autocompleteProps?: {};
  justSelect?: boolean;
  freeSolo?: boolean;
};

function AutoCompleteHandler<T>(props: AutocompleteHandlerProps<T>) {
  const {
    onChange = () => undefined,
    onChangeStr = () => undefined,
    onClear = () => undefined,
    getOptionLabel = () => "",
    renderOption = () => undefined,
    loadItemsAsync = () => () => undefined,
    justSelect,
    freeSolo = !justSelect,
    dependencyList = [],
    defaultValue,
    autocompleteProps = {},
    disabled,
    ...otherProps
  } = props;

  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const { page, setIsFetching } = usePaginationScrollAutoComlpete({
    fetch: (_, next, success) => {
      handleSearch(inputValue, next, true, success);
    },
    noHandleScroll: true,
  });

  const isNoMoreData = useCallback(
    () => total === options.length,
    [options.length, total]
  );

  const handleSearch = useCallback(
    (
      search: string,
      page: number,
      moreData?: boolean,
      success: (page: number, next: number) => void = () => {}
    ) => {
      setInputValue(search);
      setLoading(true);
      dispatch(
        loadItemsAsync(
          { search, page, moreData },
          ({ data, meta: { currentPage, next, total } }) => {
            setOptions((prev: any[]) => {
              return [...(moreData ? prev : []), ...data];
            });
            setLoading(false);
            setTotal(total);
            success(currentPage, next);
          },
          () => {
            setLoading(false);
          }
        )
      );
    },
    [dispatch, loadItemsAsync]
  );

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLUListElement, UIEvent>) => {
      const listbox = event.currentTarget;

      if (
        listbox.scrollTop + listbox.clientHeight + 10 >=
        listbox.scrollHeight
      ) {
        if (options.length < total) setIsFetching(true);
      }
    },
    [options.length, setIsFetching, total]
  );

  const handleGetOptionDisabled = useCallback(
    (option: any) => Boolean(option?.loading),
    []
  );

  const handleBlur = useCallback(() => {
    if (justSelect) {
      setInputValue("");
      handleSearch("", 1);
    }
  }, [justSelect, setInputValue, handleSearch]);

  const handleIsOptionEqualToValue = useCallback((option: any, value: any) => {
    if (option.id === value.id) return true;
    else return false;
  }, []);

  const handleRenderOption = useCallback(
    (
      props: React.HTMLAttributes<HTMLLIElement>,
      option: any,
      index: AutocompleteRenderOptionState
    ) => (
      <li {...props} key={index.index}>
        {option?.loading || renderOption(option)}
      </li>
    ),
    [renderOption]
  );

  const handleGetOptionLabel = useCallback(
    (option: any) => option.loading || getOptionLabel(option),
    [renderOption]
  );

  const handleChangeAutoComplete = useCallback(
    (
      _: React.SyntheticEvent<Element, Event>,
      value: any,
      reason: AutocompleteChangeReason
    ) => {
      if (reason === "selectOption") {
        onChange(value);
      } else if (reason === "clear") {
        handleSearch("", 1);
        onClear("");
      }
    },
    [handleSearch, onChange, onClear]
  );

  const handleTextFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      if (freeSolo) onChangeStr(value);
      handleSearch(value, 1);
    },
    [freeSolo, handleSearch, onChangeStr]
  );

  const handleLoading = useCallback(
    () =>
      loading
        ? [new Loading("Loading...")]
        : isNoMoreData()
        ? [new Loading("There no Other Results")]
        : [],
    [isNoMoreData, loading]
  );

  const handleOptions = useCallback(
    () => [...options, ...handleLoading()],
    [options, handleLoading]
  );

  useEffect(() => {
    handleSearch(inputValue, page);
    // eslint-disable-next-line
  }, [...dependencyList]);

  return (
    <Autocomplete
      disabled={disabled}
      getOptionDisabled={handleGetOptionDisabled}
      options={handleOptions()}
      ListboxProps={{
        onScroll: handleScroll,
      }}
      fullWidth
      noOptionsText={`There no Other Results...`}
      loadingText={`Loading...`}
      loading={loading}
      isOptionEqualToValue={handleIsOptionEqualToValue}
      value={defaultValue}
      renderOption={handleRenderOption}
      getOptionLabel={handleGetOptionLabel}
      onChange={handleChangeAutoComplete}
      freeSolo
      onBlur={handleBlur}
      clearOnBlur={justSelect}
      {...autocompleteProps}
      renderInput={(params) => (
        <TextFieldHandler
          {...params}
          {...otherProps}
          value={inputValue}
          onChange={handleTextFieldChange}
        />
      )}
    />
  );
}
export default memo(AutoCompleteHandler) as typeof AutoCompleteHandler;

class Loading {
  loading: string;
  constructor(readonly title: string) {
    this.loading = title;
  }
}

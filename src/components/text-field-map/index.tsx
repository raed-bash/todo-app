import { memo } from "react";
import { Grid, GridTypeMap, TextFieldProps } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";
import AutocompleteHandler, {
  AutocompleteHandlerProps,
} from "../autocomplete-handler";
import { getValuesFromStructure } from "../../utils/get-values-from-structure";
import { TextFieldHandler } from "../text-field-handler";
import { FormikProps } from "formik";

export const StyledSkeleton = styled(Skeleton)(() => ({
  transform: "scale(1)",
}));

type gridProps = { gridProps?: DefaultComponentProps<GridTypeMap> };

export type Input =
  | (gridProps & TextFieldProps)
  | (gridProps & AutocompleteHandlerProps<any> & { type: "autocomplete" });

type Props = {
  Inputs: Input[];
  formik: FormikProps<any>;
  xs?: number;
  gridProps?: DefaultComponentProps<GridTypeMap>;
  loading?: boolean;
};

function TextFieldMap(props: Props) {
  const { Inputs, formik, gridProps, xs = 12, loading } = props;

  return (
    <Grid container rowSpacing={3} {...gridProps}>
      {Inputs &&
        Inputs.map(({ gridProps, ...input }, i) => {
          const name = input.name || "";
          const errors = getValuesFromStructure(formik.errors, name);
          const value = getValuesFromStructure(formik.values, name);
          return (
            <Grid key={i} item xs={xs} {...gridProps}>
              {(function () {
                if (loading)
                  return (
                    <FormSkeleton
                      textArea={input?.multiline ? input : undefined}
                    />
                  );
                else if (input?.type === "autocomplete") {
                  return (
                    <AutocompleteHandler
                      helperText={errors}
                      error={Boolean(errors)}
                      {...(input as AutocompleteHandlerProps<any>)}
                    />
                  );
                } else if (input?.type === "date") {
                  return (
                    <TextFieldHandler
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      onChange={formik.handleChange}
                      helperText={errors}
                      error={Boolean(errors)}
                      {...input}
                      value={value || ""}
                    />
                  );
                }

                return (
                  <TextFieldHandler
                    fullWidth
                    onChange={formik.handleChange}
                    helperText={errors}
                    error={Boolean(errors)}
                    {...input}
                    label={input.label}
                    value={value || ""}
                  />
                );
              })()}
            </Grid>
          );
        })}
    </Grid>
  );
}
export default memo(TextFieldMap);

function FormSkeleton({ textArea }: { textArea: Partial<Input> | undefined }) {
  if (textArea)
    return (
      <StyledSkeleton height={textArea.rows ? textArea.rows : 1 * 36.25} />
    );
  return <StyledSkeleton height="49px" />;
}

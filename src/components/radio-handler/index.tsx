import { memo, useCallback } from "react";
import { Radio, FormHelperText, Box } from "@mui/material";
import {
  FormControlLabelStyled,
  FormControlStyled,
  FormLabelStyled,
  RadioGroupStyled,
} from "src/theme/radio-styled";

type AllowedValues = boolean | string | number;
type RadioType = {
  label: string;
  value: AllowedValues;
};

type OnChange = ({
  target,
}: {
  target: { name: string; value: AllowedValues };
}) => {};

export type RadioProps = {
  type: "radio";
  label: string;
  name: string;
  error: boolean;
  helperText: string;
  onChange: OnChange;
  value: any;
  radios: RadioType[];
  disabled: boolean;
  boolean: boolean;
};
function RadioHandler({
  name,
  label,
  error,
  helperText,
  onChange,
  value,
  radios,
  boolean,
  disabled,
}: RadioProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { name, value },
      } = e;
      if (boolean) {
        onChange({ target: { name, value: value === "true" } });
      } else {
        onChange({ target: { name, value } });
      }
    },
    [boolean, onChange]
  );

  return (
    <Box>
      <FormControlStyled error={error}>
        <FormLabelStyled>{label}</FormLabelStyled>
        <RadioGroupStyled row name={name} onChange={handleChange} value={value}>
          {radios &&
            radios.map(({ value, label }, i) => (
              <FormControlLabelStyled
                disabled={disabled}
                key={i}
                value={value}
                control={<Radio />}
                label={label}
              />
            ))}
        </RadioGroupStyled>
      </FormControlStyled>
      <FormHelperText sx={{ color: error ? "#D81F1F" : undefined }}>
        {helperText}
      </FormHelperText>
    </Box>
  );
}
export default memo(RadioHandler);

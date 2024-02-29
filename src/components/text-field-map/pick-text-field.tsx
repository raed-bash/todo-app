import { TextFieldProps } from "@mui/material";
import { TextFieldHandler } from "../text-field-handler";
import AutocompleteHandler, {
  AutocompleteHandlerProps,
} from "../autocomplete-handler";
import { FormikProps } from "formik";
import { getValuesFromStructure } from "../../utils/get-values-from-structure";
import { StyledSkeleton } from "src/theme/skeleton-styled";

function FormSkeleton({ textArea }: { textArea: Partial<Input> | undefined }) {
  if (textArea)
    return (
      <StyledSkeleton height={textArea.rows ? textArea.rows : 1 * 36.25} />
    );
  return <StyledSkeleton height="49px" />;
}

const INPUTS: Record<string, any> = {
  autocomplete: (props: AutocompleteHandlerProps<any>) => (
    <AutocompleteHandler {...(props as AutocompleteHandlerProps<any>)} />
  ),
  date: (props: TextFieldProps) => (
    <TextFieldHandler InputLabelProps={{ shrink: true }} fullWidth {...props} />
  ),
};
export type Input =
  | TextFieldProps
  | (AutocompleteHandlerProps<any> & { type: "autocomplete" });

type Props = {
  input: Input;
  formik: FormikProps<any>;
  loading?: boolean;
};
function PickTextField(props: Props) {
  const { input, formik, loading } = props;
  const { type = "text", name = "", ...otherProps } = input;

  const errors = getValuesFromStructure(formik.errors, name);
  const touched = getValuesFromStructure(formik.touched, name);
  const value = getValuesFromStructure(formik.values, name);
  if (loading)
    return (
      <FormSkeleton textArea={otherProps?.multiline ? otherProps : undefined} />
    );

  const Input = Object.keys(INPUTS).includes(type)
    ? INPUTS[type]
    : TextFieldHandler;

  return (
    <Input
      fullWidth
      onChange={formik.handleChange}
      helperText={touched && errors}
      error={touched && Boolean(errors)}
      type={type}
      name={name}
      value={value || ""}
      {...otherProps}
    />
  );
}

export default PickTextField;

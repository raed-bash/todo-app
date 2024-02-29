import { memo } from "react";
import { Grid, GridTypeMap } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import PickTextField, { type Input } from "./pick-text-field";
import { FormikProps } from "formik";

type gridProps = { gridProps?: DefaultComponentProps<GridTypeMap> };

export type gridPropsWithInputProps = Input & gridProps;

type Props = {
  Inputs: gridPropsWithInputProps[];
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
        Inputs.map(({ gridProps, ...input }, i) => (
          <Grid key={i} item xs={xs} {...gridProps}>
            <PickTextField formik={formik} input={input} loading={loading} />
          </Grid>
        ))}
    </Grid>
  );
}
export default memo(TextFieldMap);

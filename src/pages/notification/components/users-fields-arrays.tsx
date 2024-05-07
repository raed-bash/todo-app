import { FieldArray, FieldArrayRenderProps, FormikProps } from "formik";
import { FakeUserDefaultOption, SendNotificationFormikValues } from "../send";
import { memo, useEffect } from "react";
import { Grid } from "@mui/material";
import AutocompleteHandler from "src/components/autocomplete-handler";
import { User } from "src/pages/user/reducer/slice";
import { getUsersAutocompleteAsync } from "../reducer/actions";
import { toCapitalize } from "src/utils/to-capitalize";

function UsersFieldsArray<T extends FormikProps<SendNotificationFormikValues>>({
  formik,
}: {
  formik: T;
}) {
  return (
    <>
      <FieldArray name="users">
        {(arrayHelpers) => (
          <UsersFieldMap formik={formik} arrayHelpers={arrayHelpers} />
        )}
      </FieldArray>
    </>
  );
}
export default memo(UsersFieldsArray);

const UsersFieldMap = memo(function <
  T extends FormikProps<SendNotificationFormikValues>
>({
  formik,
  arrayHelpers,
}: {
  formik: T;
  arrayHelpers: FieldArrayRenderProps;
}) {
  const formikValues = formik.values;
  const usersValues = formikValues.users;
  const usersLength = usersValues.length;
  const lastUserKey_isDefined = usersValues[usersLength - 1]?.username;
  const beforeLastUser_isDefined = usersValues[usersLength - 2];

  useEffect(() => {
    const isLessThan_10_Users = usersLength < 10;

    if (lastUserKey_isDefined && isLessThan_10_Users) {
      // add new role field
      arrayHelpers.push(new FakeUserDefaultOption());
    } else if (
      beforeLastUser_isDefined?.id === 0 ||
      beforeLastUser_isDefined === null
    ) {
      arrayHelpers.remove(usersLength - 2);
    }
    // eslint-disable-next-line
  }, [usersValues]);
  return (
    <Grid container spacing={3}>
      {usersValues.map((user, i) => {
        return (
          <Grid key={i} item xs={6}>
            <AutocompleteHandler<User>
              name={`users[${i}]`}
              label={`User (${i + 1})`}
              loadItemsAsync={(q, success, fail) =>
                getUsersAutocompleteAsync(
                  {
                    ...q,
                    role:
                      formikValues.role === "ALL"
                        ? undefined
                        : formikValues.role,
                  },
                  (data) => {
                    data.data = data.data.filter(
                      (userApi) =>
                        !usersValues.some(
                          (userStored) => userStored.id === userApi.id
                        ) || user?.id === userApi.id
                    );
                    success(data);
                  },
                  fail
                )
              }
              onChange={(user) => formik.setFieldValue(`users.${i}`, user)}
              onClear={() => formik.setFieldValue(`users.${i}`, null)}
              getOptionLabel={(user) => user.username}
              renderOption={(user) => {
                return (
                  <div>
                    {user.username}
                    <span
                      style={{
                        display: "block",
                        fontSize: "14px",
                        color: "grey",
                      }}
                    >
                      {toCapitalize(user.role)}
                    </span>
                  </div>
                );
              }}
              defaultValue={user?.id ? user : null}
              justSelect
              dependencyList={[usersValues, formikValues.role]}
            />
          </Grid>
        );
      })}
    </Grid>
  );
});

import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getUsersAsync, getUsersAutocompleteAsync } from "./reducer/actions";
import Autocomplete from "../../components/autocomplete-handler";

function UserList() {
  const dispatch = useAppDispatch();
  // const {} = useAppSelector((state) => state.user.items);

  useEffect(() => {
    dispatch(
      getUsersAsync(
        {},
        (res) => {},
        () => {}
      )
    );
  }, [dispatch]);

  return (
    <h1>
      User List
      <Autocomplete<any>
        loadItemsAsync={getUsersAutocompleteAsync}
        onChange={(value) => {
          console.log(value);
        }}
        onChangeStr={() => {
          console.log("change str");
        }}
        onClear={() => {
          console.log("external clear");
        }}
        getOptionLabel={(option) => option.title}
        justSelect
        renderOption={(option) => option.title}
      />
    </h1>
  );
}

export default UserList;

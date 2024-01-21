import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUsersAsync } from "./reducer/actions";

function UserList() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.items);

  useEffect(() => {
    dispatch(
      getUsersAsync(
        {},
        (res) => {},
        () => {}
      )
    );
  }, []);

  return <h1>User List</h1>;
}

export default UserList;

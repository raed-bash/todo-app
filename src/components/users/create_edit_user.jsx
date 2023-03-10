import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createUserAsync,
  editUserAsync,
  setUsersEditAsync,
} from "../../features/users_slice";
import ErrorMessage from "../../status/alert_error";
const Form = ({ handleChange, handleSubmit, user, id, navigate }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-group">
        <label htmlFor="username">User Name</label>
        <input
          className="form-control "
          id="username"
          name="name"
          placeholder="Enter User Name"
          value={user.name || ""}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          onChange={(e) => handleChange(e)}
          value={user.email || ""}
          placeholder="Enter Email"
          required
        />
      </div>
      <div className="form-group">
        <div className="form-row align-items-center">
          <div className="col-auto my-1">
            <label className="mr-sm-2" htmlFor="gender">
              Gender
            </label>
            <select
              className="custom-select mr-sm-2"
              name="gender"
              id="gender"
              value={user.gender || ""}
              onChange={(e) => handleChange(e)}
              required
            >
              <option value={""}>Choose...</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="form-row align-items-center">
          <div className="col-auto my-1">
            <label className="mr-sm-2" htmlFor="status">
              Status
            </label>
            <select
              className="custom-select mr-sm-2"
              name="status"
              id="status"
              value={user.status || ""}
              onChange={(e) => handleChange(e)}
              required
            >
              <option value={""}>Choose...</option>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit" className={`btn btn-${id ? "warning" : "success"}`}>
        {id ? "Edit" : "Create"}
      </button>
      <button
        type="button"
        className="btn btn-outline-primary ml-3"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </form>
  );
};

export default function CreateOrEditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ id: null });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(
        setUsersEditAsync(
          id,
          (data) => {
            setUser(data);
            setLoading(true);
          },
          (error) => {
            setErrorMessage(error.message);
          }
        )
      );
    }
  }, [id, dispatch, setLoading]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(
        editUserAsync(
          user,
          () => {
            navigate(-1);
          },
          (error) => {
            setErrorMessage(error.message);
          }
        )
      );
    } else {
      dispatch(
        createUserAsync(
          user,
          () => {
            navigate(-1);
          },
          (error) => {
            setErrorMessage(error.message);
          }
        )
      );
    }
  };

  return (
    <div className="mt-5">
      <h2 className="mb-5">{id ? "Edit User" : "Create User"}</h2>
      <ErrorMessage errorMessage={errorMessage} />
      {id ? (
        loading ? (
          <Form
            handleChange={handleChange}
            user={user}
            id={id}
            navigate={navigate}
            handleSubmit={handleSubmit}
          />
        ) : (
          <h3>Loading Data...</h3>
        )
      ) : (
        <Form
          handleChange={handleChange}
          user={user}
          id={id}
          navigate={navigate}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

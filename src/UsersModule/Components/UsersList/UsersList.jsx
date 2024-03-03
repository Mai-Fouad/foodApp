import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import axios from "axios";
import { toast } from "react-toastify";
import NoDataFound from "../../../SharedModule/Components/NoDataFound/NoDataFound";

export default function Users() {
  const [usersList, setUsersList] = useState();

  const token = localStorage.getItem("loginToken");

  const getUsersList = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Users/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setUsersList(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div className="container">
      <Header
        title={"Users List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <div className="mt-3 px-4">
        <h5 className="lh-1">Users Table Details</h5>
        <h6 className="text-muted lh-1">You can check all details</h6>
      </div>
      {usersList?.length > 0 ? (
        <div className="table-responsive">
          <table className="table">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {usersList?.map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.userName}</td>
                  <td className="w-25">
                    <img
                      src={
                        user.imagePath
                          ? `https://upskilling-egypt.com:443/${user.imagePath}`
                          : ""
                      }
                      className="w-25"
                    />
                  </td>
                  <td>{user.email}</td>
                  <td className="text-end pe-4">
                    <div className="dropdown">
                      <i
                        className="fa-solid fa-ellipsis"
                        role="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></i>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a className="dropdown-item text-success" href="#">
                            <i className="fa-solid fa-eye text-success"></i>{" "}
                            View
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item text-danger" href="#">
                            <i className="fa-solid fa-trash text-danger"></i>{" "}
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
}

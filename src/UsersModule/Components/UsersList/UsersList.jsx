import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import axios from "axios";
import { toast } from "react-toastify";
import NoDataFound from "../../../SharedModule/Components/NoDataFound/NoDataFound";

export default function Users() {
  const [usersList, setUsersList] = useState();
  const [searchName, setSearchName] = useState("");
  const [groupValue, setGroupValue] = useState([]);
  const [pagesArray, setPagesArray] = useState([]);

  const token = localStorage.getItem("loginToken");

  const getUsersList = async (pageNo, pageSize, userName, groupValue) => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Users/",
        {
          headers: {
            Authorization: token,
          },
          params: {
            pageNumber: pageNo,
            pageSize: pageSize,
            userName: userName,
            groups: [groupValue],
          },
        }
      );
      setPagesArray(
        Array(response?.data?.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      console.log(response);
      setUsersList(response?.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const getNameValue = (e) => {
    setSearchName(e.target.value);
    getUsersList(1, 20, e.target.value, groupValue);
  };

  const getRoleValue = (e) => {
    console.log(e.target.value);
    setGroupValue(e.target.value);
    getUsersList(1, 20, searchName, e.target.value);
  };

  useEffect(() => {
    getUsersList(1, 20);
  }, []);

  return (
    <div className="container">
      <Header
        title={"Users List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <div className="my-3 px-4">
        <h5 className="lh-1">Users Table Details</h5>
        <h6 className="text-muted lh-1">You can check all details</h6>
      </div>

      <div className="row my-3">
        <div className="col-md-9">
          <div className="input-group mb-3">
            <span className="input-group-text border-end-0 bg-transparent">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search"
              onChange={getNameValue}
            />
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group mb-3">
            <select className="form-select" onChange={getRoleValue}>
              <option selected disabled>
                Search by Role
              </option>
              <option value="">All Roles</option>
              <option value={1}>Admin</option>
              <option value={2}>User</option>
            </select>
          </div>
        </div>
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
          <div className="d-flex justify-content-end">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#">
                    Previous
                  </a>
                </li>
                {pagesArray?.map((pageNo) => (
                  <li
                    className="page-item"
                    role="button"
                    key={pageNo}
                    onClick={() => getUsersList(pageNo, 20)}
                  >
                    <a className="page-link">{pageNo}</a>
                  </li>
                ))}
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
}

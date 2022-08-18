import React, { useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import userService from "../services/userService/userService";
import SideBar from "../components/SideBar";
import formatDate from "../utils/formatDate";
import Header from "../components/Header";

import LogOutModal from "../components//modals/LogOutModal";
import withAuth from "../utils/withAuth";
import Router from "next/router";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import ConfirmModal from "../components/modals/ConfirmModal";
import searchService from "../services/searchService/searchService";

const userManager = () => {
  const [employees, setEmployees] = useState([]);
  const [user, setUser] = useState();
  const [items, setItems] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [idCustomer, setIdCustomer] = useState();
  const [modal, setModal] = useState({
    deleteModal: false,
  });

  const [criteria, setCriteria] = useState({
    pageSize: 10,
    pageIndex: 1,
  });
  const options = [
    { value: 10, label: 10 },
    { value: 25, label: 25 },
    { value: 50, label: 50 },
  ];

  const {
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, criteria]);

  if (typeof window !== "undefined") {
    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem("user")));
    }, []);
  }

  useEffect(() => {
    if (employees?.length !== 0) {
      if (items.length == employees?.length) {
        setIsCheckAll(true);
      } else {
        setIsCheckAll(false);
      }
    }
  }, [items, employees]);

  const loadData = async () => {
    try {
      const res = await userService.findAll({
        pageSize: criteria.pageSize,
        page: criteria.pageIndex,
      });
      setPageData([...Array(res.data.totalPages).keys()].map((i) => i + 1));
      setEmployees(res.data.data.filter((item) => item._id !== user._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = (e, _id) => {
    if (e.target.checked) {
      setItems([...items, _id]);
    } else {
      setItems([...items.filter((item) => item !== _id)]);
    }
  };

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setItems(
        employees.map((item) => {
          return item._id;
        })
      );
      setIsCheckAll(true);
    } else {
      setItems([]);
      setIsCheckAll(false);
    }
  };

  const handleEdit = async (_id) => {
    Router.push("/edit-user?id=" + _id);
  };

  const handleDelete = async () => {
    try {
      if (idCustomer) {
        await userService.deleteById({ id: idCustomer });
        setIdCustomer();
      } else if (items) {
        await userService.deleteMany({
          id: items,
        });
      }
      setModal({ ...modal, deleteModal: false });
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (data) => {
    try {
      const result = await searchService.search({
        payload: {
          data: data,
          pageSize: criteria.pageSize,
          page: criteria.pageIndex,
        },
      });
      setEmployees(result.data.payload.search);
      console.log(result);
      setPageData(
        [...Array(result.data.payload.totalPages).keys()].map((i) => i + 1)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-manager">
      <Head>
        <title>SB Admin 2 - Users Page</title>
      </Head>
      <div id="page-top">
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">
          <SideBar />

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* <!-- Main Content --> */}
            <div id="content">
              <Header onSearch={handleSearch} />
              {/* {HeaderMemo} */}
              {/* <!-- Begin Page Content --> */}
              <ConfirmModal
                isOpen={modal.deleteModal}
                closeModal={() => setModal({ ...modal, deleteModal: false })}
                onDelete={handleDelete}
              />
              <div className="container-fluid">
                {/* <!-- Page Heading --> */}
                <h1 className="h3 mb-2 text-gray-800">Quản lý nhân viên</h1>

                {/* <!-- DataTales Example --> */}
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Bảng nhân viên
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        id="dataTable"
                        width="100%"
                        cellSpacing="0"
                      >
                        <thead>
                          <tr>
                            <th>
                              <input
                                checked={isCheckAll}
                                onChange={handleCheckAll}
                                type="checkbox"
                                aria-label="Checkbox for following text input"
                              />
                            </th>
                            <th>Họ</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Ngày tham gia</th>
                            <th>Quyền</th>
                            <th className="action">Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  checked={items.includes(item._id)}
                                  onChange={(e) => handleCheck(e, item._id)}
                                  type="checkbox"
                                  aria-label="Checkbox for following text input"
                                />
                              </td>
                              <td>{item.first_name}</td>
                              <td>{item.last_name}</td>
                              <td>{item.email}</td>
                              <td>{formatDate(item.created_at)}</td>
                              <td>{item.role}</td>
                              <td className="buton-action">
                                <button
                                  className="btn btn-primary btn-icon-split"
                                  onClick={() => handleEdit(item._id)}
                                >
                                  <span className="icon text-white-50">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </span>
                                  <span className="text">Chỉnh sửa</span>
                                </button>
                                <button
                                  type="button"
                                  data-toggle="modal"
                                  data-target="#exampleModal"
                                  className="btn btn-danger btn-icon-split"
                                  onClick={() => {
                                    setModal({ ...modal, deleteModal: true }),
                                      setIdCustomer(item._id);
                                  }}
                                >
                                  <span className="icon text-white-50">
                                    <i className="fas fa-trash"></i>
                                  </span>
                                  <span className="text">Xóa</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div className="pagination-parent shadow">
                      <button
                        className="btn btn-danger btn-icon-split"
                        onClick={() => {
                          setModal({ ...modal, deleteModal: true });
                        }}
                      >
                        <span className="icon text-white-50">
                          <i className="fas fa-trash"></i>
                        </span>
                        <span className="text">Xóa tất cả</span>
                      </button>
                      <div className="page-size">
                        <ReactSelect
                          options={options}
                          value={options.find(
                            (option) => option.value === criteria.pageSize
                          )}
                          onChange={(val) =>
                            setCriteria({ ...criteria, pageSize: val.value })
                          }
                        />

                        <nav className="Pager1" aria-label="pagination example">
                          <ul className="pagination pagination-circle justify-content-center">
                            <button
                              disabled={criteria.pageIndex === 1 ? true : false}
                              className={`page-item ${
                                criteria.pageIndex === 1
                                  ? "disabled"
                                  : "undisabled"
                              }`}
                              onClick={() =>
                                setCriteria({
                                  ...criteria,
                                  pageIndex: criteria.pageIndex - 1,
                                })
                              }
                            >
                              <a className="page-link">Previous</a>
                            </button>

                            {pageData?.map((index) => (
                              <li
                                key={index}
                                onClick={() =>
                                  setCriteria({ ...criteria, pageIndex: index })
                                }
                                className={`page-item element-page ${
                                  index === criteria.pageIndex ? "active" : ""
                                }`}
                              >
                                <a className="page-link">{index}</a>
                              </li>
                            ))}

                            <button
                              disabled={
                                criteria.pageIndex === pageData.length
                                  ? true
                                  : false
                              }
                              className={`page-item ${
                                criteria.pageIndex === pageData.length
                                  ? "disabled"
                                  : "undisabled"
                              }`}
                              onClick={() =>
                                setCriteria({
                                  ...criteria,
                                  pageIndex: criteria.pageIndex + 1,
                                })
                              }
                            >
                              <a className="page-link">Next</a>
                            </button>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /.container-fluid --> */}
            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2020</span>
                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}
          </div>
          {/* <!-- End of Content Wrapper --> */}
        </div>
        {/* <!-- End of Page Wrapper --> */}

        {/* <!-- Scroll to Top Button--> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
        <LogOutModal />
      </div>
    </div>
  );
};

export default withAuth(userManager);

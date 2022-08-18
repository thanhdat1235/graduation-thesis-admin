import React, { useState, useEffect, useRef, useMemo } from "react";
// import Header from "../../components/Header";\
import HeaderPost from "../../components/HeaderPost";
import SideBar from "../../components/SideBar";
import LogOutModal from "../../components/modals/LogOutModal";
import Head from "next/head";
import ReactSelect from "react-select";
import { useForm, Controller } from "react-hook-form";
import MenuList from "../../components/MenuList";
import ReactSwitch from "react-switch";
import contactService from "../../services/contactService/contactService";
import formatDate from "../../utils/formatDate";
import Router from "next/router";

const ContactManager = () => {
  const displayPage = 5;
  const [dataContact, setDataContact] = useState([]);
  const [items, setItems] = useState([]);
  const [pageAble, setPageAble] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  const [pageData, setPageData] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const optionsLine = [
    { value: 10, label: "10 dòng/trang" },
    { value: 25, label: "25 dòng/trang" },
    { value: 50, label: "50 dòng/trang" },
  ];

  useEffect(() => {
    getAllContact();
  }, [pageAble]);

  useEffect(() => {
    if (dataContact?.length !== 0) {
      if (items.length == dataContact?.length) {
        setIsCheckAll(true);
      } else {
        setIsDisabled(false);
      }
    }
    if (items.length >= 2) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [items, dataContact]);

  // useEffect(() => {
  //   if(pageData > 5){
  //     set
  //   }
  // },[pageData])

  const getAllContact = async () => {
    try {
      const response = await contactService.getAll({
        pageIndex: pageAble.pageIndex,
        pageSize: pageAble.pageSize,
      });
      setPageData(
        [...Array(response.data.totalPages).keys()].map((i) => i + 1)
      );
      setDataContact(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setItems(
        dataContact.map((item) => {
          return item._id;
        })
      );
      setIsCheckAll(true);
    } else {
      setItems([]);
      setIsCheckAll(false);
    }
  };

  const handleCheck = (e, _id) => {
    if (e.target.checked) {
      setItems([...items, _id]);
    } else {
      setItems([...items.filter((item) => item !== _id)]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await contactService.deleteContact({
        id: id,
      });
      getAllContact();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMany = async () => {
    try {
      await contactService.deleteManyContact({
        ids: items,
      });
      getAllContact();
      setIsDisabled(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Quản lý liên hệ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="page-top">
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">
          <SideBar />

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* <!-- Main Content --> */}
            <div id="content">
              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">
                {/* <!-- Page Heading --> */}
                <HeaderPost title={"Contact"} />
                <form className="form-post-manager">
                  <div className="field-filter">
                    <div className="field-name filter">
                      <ReactSelect placeholder="Tên bài viết" isClearable />
                    </div>
                    <div className="field-in filter">
                      <ReactSelect placeholder="Có chứa" isClearable />
                    </div>
                    <div className="field-value filter">
                      <input placeholder="Nhập giá trị" />
                    </div>
                    <div className="field-add filter">
                      <input type="button" value="Thêm điều kiện lọc" />
                    </div>
                  </div>
                  <table className="table">
                    <thead className="thead-light">
                      <tr className="thead-table">
                        <th scope="col">
                          <input
                            checked={isCheckAll}
                            onChange={handleCheckAll}
                            type="checkbox"
                            aria-label="Checkbox for following text input"
                          />
                        </th>
                        <th scope="col">HỌ VÀ TÊN</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">SỐ ĐIỆN THOẠI</th>
                        <th scope="col">NGÀY LIÊN HỆ</th>
                        <th scope="col">NHU CẦU</th>
                        <th scope="col" className="action-th">
                          HÀNH ĐỘNG
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataContact?.map((data) => (
                        <tr key={data._id}>
                          <td>
                            <input
                              checked={items.includes(data._id)}
                              onChange={(e) => handleCheck(e, data._id)}
                              type="checkbox"
                              aria-label="Checkbox for following text input"
                            />
                          </td>
                          <td>{data.fullName}</td>
                          <td className="name-post">{data.email}</td>
                          <td>{data.phoneNumber}</td>
                          <td>{formatDate(data.created_at)}</td>
                          <td className="status">{data.demand}</td>
                          <td className="action">
                            <button
                              className="btn btn-primary btn-edit"
                              type="button"
                              // onClick={() => {
                              //   Router.push(
                              //     "/posts/create-post?id=" + data._id
                              //   );
                              // }}
                            >
                              Xem
                            </button>
                            <button
                              className="btn btn-danger btn-delete"
                              type="button"
                              onClick={() => handleDelete(data._id)}
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="footer-form">
                    <div className="page-size">
                      <div className="button-delete">
                        <button
                          type="button"
                          className="btn btn-danger"
                          disabled={isDisabled}
                          onClick={handleDeleteMany}
                        >
                          Xóa tất cả
                        </button>
                      </div>
                      <ReactSelect
                        options={optionsLine}
                        value={optionsLine.find(
                          (option) => option.value === pageAble.pageSize
                        )}
                        onChange={(val) =>
                          setPageAble({ ...pageAble, pageSize: val.value })
                        }
                      />
                    </div>
                    <div className="text-center">
                      <span>Hiển thị 1 - 10 trong 50 kết quả</span>
                    </div>
                    <div className="pagination">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <button
                            type="button"
                            className={`page-item ${
                              pageAble.pageIndex === 1
                                ? "disabled"
                                : "undisabled"
                            }`}
                            disabled={pageAble.pageIndex === 1 ? true : false}
                            onClick={(e) => {
                              e.preventDefault();
                              setPageAble({
                                ...pageAble,
                                pageIndex: pageAble.pageIndex - 1,
                              });
                            }}
                          >
                            <a
                              className="page-link"
                              href="#"
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">&laquo;</span>
                              <span className="sr-only">Previous</span>
                            </a>
                          </button>
                          {pageData?.map(
                            (item, index) =>
                              index > pageAble.pageIndex - 4 &&
                              index < pageAble.pageIndex + 2 && (
                                <li
                                  className="page-item"
                                  key={index}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setPageAble({
                                      ...pageAble,
                                      pageIndex: item,
                                    });
                                  }}
                                >
                                  <a
                                    className={`page-link ${
                                      item === pageAble.pageIndex
                                        ? "active-custom"
                                        : ""
                                    }`}
                                    href="#"
                                  >
                                    {index < pageAble.pageIndex + 1 ? (
                                      item
                                    ) : (
                                      <button className="dot" disabled>
                                        ...
                                      </button>
                                    )}
                                  </a>
                                </li>
                              )
                          )}
                          <button
                            className={`page-item ${
                              pageAble.pageIndex === pageData.length
                                ? "disabled"
                                : "undisabled"
                            }`}
                            type="button"
                            disabled={
                              pageAble.pageIndex === pageData.length
                                ? true
                                : false
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              setPageAble({
                                ...pageAble,
                                pageIndex: pageAble.pageIndex + 1,
                              });
                            }}
                          >
                            <a className="page-link" href="#" aria-label="Next">
                              <span aria-hidden="true">&raquo;</span>
                              <span className="sr-only">Next</span>
                            </a>
                          </button>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </form>
                {/* <!-- DataTales Example --> */}
                <div className="card shadow mb-4"></div>
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
    </>
  );
};

export default ContactManager;

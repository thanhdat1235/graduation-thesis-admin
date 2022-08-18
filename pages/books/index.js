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
import postService from "../../services/postService/postService";
import bookService from "../../services/bookService/bookService";
import formatDate from "../../utils/formatDate";
import Router from "next/router";

const dataBookDefault = {
  name: "",
  avatar_photo: "",
  description: "",
  price: "",
  amount: "",
  cover_photo: "",
  form_style: "",
};

const postManager = () => {
  const [dataBook, setDataBook] = useState([]);
  const [items, setItems] = useState([]);
  const [pageAble, setPageAble] = useState({
    page: 1,
    pageSize: 10,
  });

  const [pageData, setPageData] = useState([]);
  const [showClass, setShowClass] = useState("");
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const optionsLine = [
    { value: 10, label: "10 dòng/trang" },
    { value: 25, label: "25 dòng/trang" },
    { value: 50, label: "50 dòng/trang" },
  ];

  useEffect(() => {
    getAllBook();
  }, [pageAble]);

  useEffect(() => {
    if (dataBook?.length !== 0) {
      if (items.length == dataBook?.length) {
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
  }, [items, dataBook]);

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setItems(
        dataBook.map((item) => {
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

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: dataBookDefault,
  });

  const getAllTags = async () => {
    try {
      const response = await bookService.getAllTags();
      // console.log(response);
      setOptionsTags(
        response.data.map((item) => ({
          label: item.name,
          value: item._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBook = async () => {
    try {
      const response = await bookService.getAllBook({
        page: pageAble.page,
        pageSize: pageAble.pageSize,
      });
      if (!response.data.data) {
        setShowClass("hidden");
      } else {
        setShowClass("");
      }
      setPageData(
        [...Array(response.data.totalPages).keys()].map((i) => i + 1)
      );
      console.log(response.data);
      setDataBook(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await bookService.deleteById({
        id: id,
      });
      getAllBook();
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDeleteMany = async () => {
  //   try {
  //     await bookService.deleteManyPost({
  //       ids: items,
  //     });
  //     getAllBook();
  //     setIsDisabled(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Head>
        <title>Quản lý sách</title>
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
                <HeaderPost title={"Quản lý sách"} />
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
                        <th scope="col">ẢNH</th>
                        <th scope="col">TÊN SÁCH</th>
                        <th scope="col">NGÀY NHẬP KHO</th>
                        <th scope="col">SỐ LƯỢNG</th>
                        <th scope="col">GIÁ</th>
                        <th scope="col">NHÀ XUẤT BẢN</th>
                        <th scope="col" className="action-th">
                          HÀNH ĐỘNG
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataBook?.map((data) => (
                        <tr key={data._id}>
                          <td>
                            <input
                              checked={items.includes(data._id)}
                              onChange={(e) => handleCheck(e, data._id)}
                              type="checkbox"
                              aria-label="Checkbox for following text input"
                            />
                          </td>
                          <th scope="row">
                            <img src={data.avatar_photo} />
                          </th>
                          <td className="name-post">{data.name}</td>
                          <td>{formatDate(data.created_at)}</td>
                          <td>{data.amount}</td>
                          <td className="status">{data.price}</td>
                          <td>{data.publishers?.name}</td>
                          <td className="action">
                            <button
                              className="btn btn-primary btn-edit"
                              type="button"
                              onClick={() => {
                                Router.push(
                                  "/books/create-book?id=" + data._id
                                );
                              }}
                            >
                              Chỉnh sửa
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
                  <div className={`footer-form ${showClass}`}>
                    <div className="page-size">
                      <div className="button-delete">
                        <button
                          type="button"
                          className="btn btn-danger"
                          disabled={isDisabled}
                          // onClick={handleDeleteMany}
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
                            className={`page-item ${
                              pageAble.page === 1 ? "disabled" : "undisabled"
                            }`}
                            disabled={pageAble.page === 1 ? true : false}
                            onClick={() =>
                              setPageAble({
                                ...pageAble,
                                page: pageAble.page - 1,
                              })
                            }
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
                          {pageData?.map((index) => (
                            <li
                              className="page-item"
                              key={index}
                              onClick={() =>
                                setPageAble({ ...pageAble, page: index })
                              }
                            >
                              <a
                                className={`page-link ${
                                  index === pageAble.page ? "active-custom" : ""
                                }`}
                                href="#"
                              >
                                {index}
                              </a>
                            </li>
                          ))}
                          <button
                            className={`page-item ${
                              pageAble.page === pageData.length
                                ? "disabled"
                                : "undisabled"
                            }`}
                            disabled={
                              pageAble.page === pageData.length ? true : false
                            }
                            onClick={() =>
                              setPageAble({
                                ...pageAble,
                                page: pageAble.page + 1,
                              })
                            }
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

export default postManager;

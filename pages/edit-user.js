import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import userService from "../services/userService/userService";
import SideBar from "../components/SideBar";
import formatDate from "../utils/formatDate";
import Header from "../components/Header";
import LogOutModal from "../components//modals/LogOutModal";
import withAuth from "../utils/withAuth";
import Router, { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";

const editUser = () => {
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState();
  const [isDisabled, setIsDisabled] = useState();
  if (typeof window !== "undefined") {
    useEffect(() => {
      const userLogin = JSON.parse(localStorage.getItem("user"));
      setIsDisabled(!(userLogin.role === "Admin"));
    }, []);
  }

  const { query } = useRouter();
  const options = [
    { value: "User", label: "Nhân viên" },
    { value: "Manager", label: "Quản lý" },
    { value: "Admin", label: "Admin" },
  ];

  useEffect(() => {
    if (query.id) {
      loadData();
    }
  }, [query.id]);

  const loadData = async () => {
    const response = await userService.findOne({ id: query.id });
    setUser(response.data);
    setUserRole(response.data.role);
    reset(response.data);
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const setStyleValidate = (name) =>
    errors[name] ? { border: "1px solid red" } : null;

  const onSubmit = async (data) => {
    try {
      await userService.updateUser({
        id: query?.id,
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          role: data.role,
          password: data.password,
        },
      });
      Router.push("/user-manager");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-page">
      <Head>
        <title>SB Admin 2 - Edit Page</title>
      </Head>
      <div id="page-top">
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">
          <SideBar />

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* <!-- Main Content --> */}
            <div id="content">
              <Header />
              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">
                <div className="container center">
                  <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 edit_information">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <h3 className="text-center">Chỉnh sửa thông tin</h3>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label className="profile_details_text">
                              Họ và tên đệm :
                            </label>
                            <input
                              type="text"
                              name="first_name"
                              className="form-control"
                              style={setStyleValidate("first_name")}
                              {...register("first_name", {
                                required: true,
                              })}
                            />
                            {errors.first_name?.type === "required" && (
                              <span className="text-danger">
                                Vui lòng nhập họ và tên đệm
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label className="profile_details_text">
                              Tên :
                            </label>
                            <input
                              type="text"
                              name="last_name"
                              className="form-control"
                              style={setStyleValidate("last_name")}
                              {...register("last_name", {
                                required: true,
                              })}
                            />
                            {errors.last_name?.type === "required" && (
                              <span className="text-danger">
                                Vui lòng nhập tên
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <label className="profile_details_text">
                              Email :
                            </label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              disabled={true}
                              {...register("email", {
                                required: true,
                              })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <label className="profile_details_text">
                              Quyền:
                            </label>
                            <Controller
                              name="role"
                              className="form-control"
                              // defaultValue={{
                              //   label:
                              //     user !== undefined ? user?.role : "K cos",
                              //   value: console.log(user?.role),
                              // }}
                              control={control}
                              rules={{ required: true }}
                              style={setStyleValidate("role")}
                              render={({ field: { onChange, value } }) => (
                                <ReactSelect
                                  isClearable
                                  options={options}
                                  isDisabled={isDisabled}
                                  value={options.find(
                                    (option) => option.value === value
                                  )}
                                  onChange={(value) => onChange(value?.value)}
                                />
                              )}
                            />
                            {errors.ReactSelect?.type === "required" && (
                              <span className="text-danger">
                                Vui lòng chọn quyền
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 password">
                          <div className="form-group">
                            <label className="profile_details_text">
                              Mật khẩu :
                            </label>
                            <input
                              name="password"
                              className="form-control"
                              type="password"
                              style={setStyleValidate("password")}
                              {...register("password", {
                                required: true,
                                minLength: 6,
                              })}
                            />
                            {errors.password?.type === "required" && (
                              <span className="text-danger">
                                Vui lòng nhập mật khẩu
                              </span>
                            )}
                            {errors.password?.type === "minLength" && (
                              <span className="text-danger">
                                Mật khẩu phải tối thiểu 6 ký tự
                              </span>
                            )}
                          </div>
                          <div className="form-group">
                            <label className="profile_details_text">
                              Nhập lại mật khẩu :
                            </label>
                            <input
                              type="password"
                              name="confirmPassword"
                              className="form-control"
                              style={setStyleValidate("confirmPassword")}
                              {...register("confirmPassword", {
                                required: true,
                                validate: (value) => {
                                  return (
                                    value === watch("password") ||
                                    "Mật khẩu không khớp"
                                  );
                                },
                              })}
                            />
                            {errors.confirmPassword?.type === "required" && (
                              <span className="text-danger">
                                Vui lòng nhập lại mật khẩu
                              </span>
                            )}
                            {errors.confirmPassword && (
                              <span className="text-danger">
                                {errors.confirmPassword.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 submit">
                          <div className="form-group">
                            <input type="submit" className="btn btn-success" />
                          </div>
                        </div>
                      </div>
                    </form>
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

export default editUser;

import React, { useState, useEffect, useRef, useMemo } from "react";
// import Header from "../../components/Header";\
import HeaderPost from "../../components/HeaderPost";
import SideBar from "../../components/SideBar";
import LogOutModal from "../../components/modals/LogOutModal";
import Head from "next/head";
import Editor from "../../components/Editor";
import uploadService from "../../services/uploadService/uploadService";
import UploadImageModal from "../../components/modals/UploadImageModal";
import ReactSelect from "react-select";
import { useForm, Controller } from "react-hook-form";
import MenuList from "../../components/MenuList";
import { OptionCustom } from "../../components/OptionCustom";
import AddCategoryModal from "../../components/modals/AddCategoryModal";
import AddTagsModal from "../../components/modals/AddTagsModal";
import AddPublisherModal from "../../components/modals/AddPublisherModal";
import ReactSwitch from "react-switch";
import bookService from "../../services/bookService/bookService";
import { convertQueryToJson } from "../../utils/convertQueryToJson";
import Router from "next/router";
import AddSupplierModal from "../../components/modals/AddSupplierModal";
import AddAuthorModal from "../../components/modals/AddAuthorModall";

const dataBookDefault = {
  name: "",
  avatar_photo: "",
  description: "",
  price: "",
  amount: "",
  form_style: "",
  publisherId: "",
  supplierId: "",
  authorId: "",
  categoryId: "",
  tagId: "",
};

const createPost = () => {
  const editorDefault = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [avtImage, setAvtImage] = useState("");
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const [optionsPublisher, setOptionsPublisher] = useState([]);
  const [optionsSupplier, setOptionsSupplier] = useState([]);
  const [optionsCategory, setOptionsCategory] = useState([]);
  const [optionsTags, setOptionsTags] = useState([]);
  const [optionAuthor, setOptionAuthor] = useState([]);
  const [dataBooks, setDataBooks] = useState(dataBookDefault);
  const [dataEditor, setDataEditor] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [author, setAuthor] = useState({
    name_author: "",
    introduce: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const url = convertQueryToJson();

  const [errorCkEditor, setErrorCkEditor] = useState({
    message: "",
  });

  const [errorImages, setErrorImages] = useState({
    styleBoder: "",
    message: "",
  });

  const [modal, setModal] = useState({
    addCategoryModal: false,
    addTagsModal: false,
    addPublisherModal: false,
    addSupplierModal: false,
    addAuthorModal: false,
  });

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

  const optionForm = [
    { value: "Mềm", label: "Bìa mềm" },
    { value: "Cứng", label: "Bìa cứng" },
  ];

  const setStyleValidate = (name) =>
    errors[name] ? { border: "1px solid red" } : null;

  useEffect(() => {
    setEditorLoaded(true);
    // reset(dataBookDefault);
  }, []);

  useEffect(() => {
    window.addEventListener("uploadImage", () => {
      setUploadImageModal(true);
    });
  }, []);

  useEffect(() => {
    getAllPublisher();
    getAllSupplier();
    getAllCategory();
    getAllAuthor();
    getAllTags();
    if (url.id) {
      findBookById();
    }
  }, []);

  const findBookById = async () => {
    try {
      const response = await bookService.findOneBook({
        id: url.id,
      });
      reset({
        ...response.data,
        publisherId: response.data.publishers,
        supplierId: response.data.suppliers,
        authorId: response.data.authors._id,
        categoryId: response.data.categories,
        tagId: response.data.tags,
      });
      setDataBooks({
        ...response.data,
        avatar_photo: response.data.avatar_photo,
      });
      setAvtImage(response.data.avatar_photo);
      setCategoryId(response.data.categories);
      setDataEditor(response.data.ckeditor_data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInsertContent = (content) => {
    const viewFragment = editorDefault.current.data.processor.toView(content);
    const modelFragment = editorDefault.current.data.toModel(viewFragment);
    editorDefault.current.model.insertContent(modelFragment);
  };

  const handleLinkImageEditor = (url) => {
    const figure = `<figure class="image"><img src="${url}"></figure>`;
    handleInsertContent(`${figure}`);
    setUploadImageModal(false);
  };

  const handleChangeFile = async (e) => {
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      try {
        const response = await uploadService.uploadImage({ data: formData });
        const figure = `<figure class="image"><img src="${response.data.filePath}"></figure>`;
        handleInsertContent(`${figure}`);
        setUploadImageModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeImage = async (e) => {
    if (e.target.files[0]) {
      setErrorImages({
        styleBoder: "",
        message: "",
      });
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      try {
        const response = await uploadService.uploadImage({ data: formData });
        setAvtImage(response.data.filePath);
        setDataBooks(() => ({
          ...dataBooks,
          avatar_photo: response.data.filePath,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const styleSelect = {
    control: (base) => ({
      ...base,
      fontSize: "14px",
    }),
    menu: (base) => ({
      ...base,
      fontSize: "14px",
      zIndex: 9999999999999,
    }),
  };

  const getAllPublisher = async () => {
    try {
      const response = await bookService.getAllPublisher();
      setOptionsPublisher(
        response.data.map((item) => ({ label: item.name, value: item._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSupplier = async () => {
    try {
      const response = await bookService.getAllSupplier();
      setOptionsSupplier(
        response.data.map((item) => ({ label: item.name, value: item._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const response = await bookService.getAll();
      setOptionsCategory(
        response.data.map((item) => ({ label: item.name, value: item._id }))
      );
      // console.log(response.data);
    } catch (errors) {
      console.log(errors);
    }
  };

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

  const getAllAuthor = async () => {
    try {
      const response = await bookService.getAllAuthor();
      setOptionAuthor(
        response.data.map((item) => ({
          label: item.name_author,
          value: item._id,
        }))
      );
      setAuthor(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsDisabled(true);
      console.log(data);
      if (!url.id) {
        await bookService.createBook({
          name: data.name,
          avatar_photo: dataBooks.avatar_photo,
          description: data.description,
          price: data.price,
          amount: data.amount,
          form_style: data.form_style,
          publisherId: data.publisherId,
          supplierId: data.supplierId,
          authorId: data.authorId,
          categoryId: data.categoryId,
          tagId: data.tagId,
        });
        Router.push("/books");
      } else {
        await bookService.updateBook({
          id: url.id,
          data: {
            name: data.name,
            avatar_photo: dataBooks.avatar_photo,
            description: data.description,
            price: data.price,
            amount: data.amount,
            form_style: data.form_style,
            publishers: data.publisherId,
            suppliers: data.supplierId,
            authors: data.authorId,
            categories: data.categoryId,
            tags: data.tagId,
          },
        });
        Router.push("/books");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  };

  const handleError = () => {
    if (!dataBooks.urlImage) {
      setErrorImages({
        styleBoder: "1px solid red",
        message: "Vui lòng chọn ảnh đại diện",
      });
    }
    if (!dataEditor) {
      setErrorCkEditor({
        message: "Vui lòng nhập nội dung cho bài viết",
      });
    }
  };

  return (
    <>
      <Head>
        <title>{url?.id ? "Chỉnh sửa thông tin sách" : "Thêm sách mới"}</title>
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
                <HeaderPost title={"Thêm sách mới"} />
                <AddCategoryModal
                  isOpen={modal.addCategoryModal}
                  closeModal={() =>
                    setModal({ ...modal, addCategoryModal: false })
                  }
                  publisherId={publisherId}
                  supplierId={supplierId}
                  onReload={getAllCategory}
                />
                <AddTagsModal
                  isOpen={modal.addTagsModal}
                  closeModal={() => setModal({ ...modal, addTagsModal: false })}
                  publisherId={publisherId}
                  supplierId={supplierId}
                  categoryId={categoryId}
                  onReload={getAllTags}
                />
                <AddPublisherModal
                  isOpen={modal.addPublisherModal}
                  closeModal={() =>
                    setModal({ ...modal, addPublisherModal: false })
                  }
                  onReload={getAllPublisher}
                />
                <AddAuthorModal
                  isOpen={modal.addAuthorModal}
                  closeModal={() =>
                    setModal({ ...modal, addAuthorModal: false })
                  }
                  onReload={getAllAuthor}
                />
                <AddSupplierModal
                  isOpen={modal.addSupplierModal}
                  closeModal={() =>
                    setModal({ ...modal, addSupplierModal: false })
                  }
                  onReload={getAllSupplier}
                  publisherId={publisherId}
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="ckeditor ">
                    <div className="left-content ">
                      <div className="ckeditor-content">
                        <h3>Thông tin sách</h3>
                        <div className="form-group">
                          <label className="profile_details_text">
                            Tên sách
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Nhập tên sách"
                            style={setStyleValidate("name")}
                            {...register("name", {
                              required: "Vui lòng nhập tên sách",
                            })}
                          />
                          {errors.name && (
                            <span className="text-danger">
                              {errors.name.message}
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="profile_details_text">
                            Mô tả sách :
                          </label>
                          <textarea
                            type="text"
                            name="description"
                            className="form-control"
                            placeholder="Mô tả sách"
                            style={setStyleValidate("description")}
                            {...register("description", {
                              required: "Vui lòng nhập mô tả",
                            })}
                          />
                          {errors.description?.type === "required" && (
                            <span className="text-danger">
                              {errors.description.message}
                            </span>
                          )}
                        </div>
                        <div className="price-amount">
                          <div className="form-group">
                            <label className="profile_details_text">
                              Giá bán
                            </label>
                            <input
                              type="text"
                              name="price"
                              className="form-control"
                              placeholder="Nhập giá bán"
                              style={setStyleValidate("price")}
                              {...register("price", {
                                required: "Vui lòng nhập giá bán",
                              })}
                            />
                            {errors.price && (
                              <span className="text-danger">
                                {errors.price.message}
                              </span>
                            )}
                          </div>
                          <div className="form-group">
                            <label className="profile_details_text">
                              Số lượng
                            </label>
                            <input
                              type="text"
                              name="amount"
                              className="form-control"
                              placeholder="Nhập số lượng"
                              style={setStyleValidate("amount")}
                              {...register("amount", {
                                required: "Vui lòng nhập số lượng",
                              })}
                            />
                            {errors.amount && (
                              <span className="text-danger">
                                {errors.amount.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="ckeditor-content">
                        <h3>Thông tin nhà xuất bản</h3>
                        <div className="form-group">
                          <Controller
                            name="publisherId"
                            className="form-control"
                            control={control}
                            rules={{
                              required: "Vui lòng chọn nhà xuất bản",
                            }}
                            style={setStyleValidate("publisherId")}
                            render={({ field: { onChange, value } }) => (
                              <ReactSelect
                                placeholder="Chọn nhà xuất bản"
                                title="Thêm nhà xuất bản mới"
                                components={{ MenuList }}
                                openModal={() =>
                                  setModal({
                                    ...modal,
                                    addPublisherModal: true,
                                  })
                                }
                                styles={styleSelect}
                                isClearable
                                options={optionsPublisher}
                                value={optionsPublisher.find(
                                  (option) => option.value === value
                                )}
                                onChange={(value) => {
                                  setPublisherId(value?.value),
                                    onChange(value?.value);
                                }}
                              />
                            )}
                          />
                          {errors.publisherId && (
                            <span className="text-danger">
                              {errors.publisherId.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ckeditor-content">
                        <h3>Thông tin nhà cung cấp</h3>
                        <div className="form-group">
                          <Controller
                            name="supplierId"
                            className="form-control"
                            control={control}
                            rules={{
                              required: "Vui lòng chọn nhà cung cấp",
                            }}
                            style={setStyleValidate("supplierId")}
                            render={({ field: { onChange, value } }) => (
                              <ReactSelect
                                placeholder="Chọn nhà cung cấp"
                                title="Thêm nhà cung cấp mới"
                                components={{ MenuList }}
                                openModal={() =>
                                  setModal({
                                    ...modal,
                                    addSupplierModal: true,
                                  })
                                }
                                styles={styleSelect}
                                isClearable
                                options={optionsSupplier}
                                value={optionsSupplier.find(
                                  (option) => option.value === value
                                )}
                                onChange={(value) => {
                                  setSupplierId(value?.value),
                                    onChange(value?.value);
                                }}
                              />
                            )}
                          />
                          {errors.supplierId && (
                            <span className="text-danger">
                              {errors.supplierId.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ckeditor-content">
                        <h3>Thông tin tác giả</h3>
                        <div className="form-group">
                          <Controller
                            name="authorId"
                            className="form-control"
                            control={control}
                            rules={{
                              required: "Vui lòng chọn tác giả",
                            }}
                            style={setStyleValidate("authorId")}
                            render={({ field: { onChange, value } }) => (
                              <ReactSelect
                                placeholder="Chọn tác giả"
                                title="Thêm tác giả mới"
                                components={{ MenuList }}
                                openModal={() =>
                                  setModal({
                                    ...modal,
                                    addAuthorModal: true,
                                  })
                                }
                                styles={styleSelect}
                                isClearable
                                options={optionAuthor}
                                value={optionAuthor.find(
                                  (option) => option.value === value
                                )}
                                onChange={(value) => onChange(value?.value)}
                              />
                            )}
                          />
                          {errors.authorId && (
                            <span className="text-danger">
                              {errors.authorId.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="right-content ">
                      <div className="parent-post-content">
                        <label>Danh mục sách</label>
                        <Controller
                          name="categoryId"
                          className="form-control"
                          control={control}
                          rules={{ required: "Vui lòng chọn danh mục" }}
                          style={setStyleValidate("categoryId")}
                          render={({ field: { onChange, value } }) => (
                            <ReactSelect
                              placeholder="Chọn danh mục sách"
                              components={{ MenuList, Option: OptionCustom }}
                              title="Thêm danh mục mới"
                              openModal={() =>
                                setModal({ ...modal, addCategoryModal: true })
                              }
                              styles={styleSelect}
                              isClearable
                              options={optionsCategory}
                              value={optionsCategory.find(
                                (option) => option.value === value
                              )}
                              onChange={(value) => {
                                onChange(value?.value);
                                setCategoryId(value?.value);
                              }}
                            />
                          )}
                        />
                        {errors.categoryId && (
                          <span className="text-danger">
                            {errors.categoryId.message}
                          </span>
                        )}
                      </div>
                      <div className="parent-post-content">
                        <label>Thể loại sách</label>
                        <Controller
                          name="tagId"
                          className="form-control"
                          control={control}
                          rules={{ required: "Vui lòng chọn bài viết cha" }}
                          style={setStyleValidate("tagId")}
                          render={({ field: { onChange, value } }) => (
                            <ReactSelect
                              placeholder="Chọn thể loại sách"
                              title="Thêm thể loại sách"
                              components={{ MenuList }}
                              openModal={() =>
                                setModal({ ...modal, addTagsModal: true })
                              }
                              styles={styleSelect}
                              isClearable
                              options={optionsTags}
                              value={optionsTags.find(
                                (option) => option.value === value
                              )}
                              onChange={(value) => onChange(value?.value)}
                            />
                          )}
                        />
                        {errors.tagId && (
                          <span className="text-danger">
                            {errors.tagId.message}
                          </span>
                        )}
                      </div>
                      <div className="image-post-content">
                        <label>Ảnh bìa</label>
                        <input
                          type="file"
                          onChange={(e) => handleChangeImage(e)}
                        />
                        <div className="image-post">
                          <img src={avtImage || "/img/no-image.png"} />
                          <div className="overlay">Tải lên hình ảnh</div>
                        </div>
                        <span className="text-danger">
                          {errorImages.message}
                        </span>
                      </div>
                      <div className="template-post-content">
                        <label>Kiểu bìa</label>
                        <Controller
                          name="form_style"
                          className="form-control"
                          control={control}
                          rules={{
                            required: "Vui lòng chọn kiểu bìa sách",
                          }}
                          style={setStyleValidate("form_style")}
                          render={({ field: { onChange, value } }) => (
                            <ReactSelect
                              placeholder="Chọn kiểu bìa sách"
                              title="Thêm kiểu bìa mới"
                              components={{ MenuList }}
                              openModal={() =>
                                setModal({ ...modal, addPublisherModal: true })
                              }
                              styles={styleSelect}
                              isClearable
                              options={optionForm}
                              value={optionForm.find(
                                (option) => option.value === value
                              )}
                              onChange={(value) => onChange(value?.value)}
                            />
                          )}
                        />
                        {errors.form_style && (
                          <span className="text-danger">
                            {errors.form_style.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="btn-post">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isDisabled}
                      onClick={() => handleError()}
                    >
                      Cập nhật
                    </button>
                  </div>
                </form>
                <UploadImageModal
                  visible={uploadImageModal}
                  closeModal={() => setUploadImageModal(false)}
                  onSubmit={({ linkImage }) => handleLinkImageEditor(linkImage)}
                  handleChangeFile={handleChangeFile}
                />
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

export default createPost;

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
    { value: "M???m", label: "B??a m???m" },
    { value: "C???ng", label: "B??a c???ng" },
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
        message: "Vui l??ng ch???n ???nh ?????i di???n",
      });
    }
    if (!dataEditor) {
      setErrorCkEditor({
        message: "Vui l??ng nh???p n???i dung cho b??i vi???t",
      });
    }
  };

  return (
    <>
      <Head>
        <title>{url?.id ? "Ch???nh s???a th??ng tin s??ch" : "Th??m s??ch m???i"}</title>
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
                <HeaderPost title={"Th??m s??ch m???i"} />
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
                        <h3>Th??ng tin s??ch</h3>
                        <div className="form-group">
                          <label className="profile_details_text">
                            T??n s??ch
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Nh???p t??n s??ch"
                            style={setStyleValidate("name")}
                            {...register("name", {
                              required: "Vui l??ng nh???p t??n s??ch",
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
                            M?? t??? s??ch :
                          </label>
                          <textarea
                            type="text"
                            name="description"
                            className="form-control"
                            placeholder="M?? t??? s??ch"
                            style={setStyleValidate("description")}
                            {...register("description", {
                              required: "Vui l??ng nh???p m?? t???",
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
                              Gi?? b??n
                            </label>
                            <input
                              type="text"
                              name="price"
                              className="form-control"
                              placeholder="Nh???p gi?? b??n"
                              style={setStyleValidate("price")}
                              {...register("price", {
                                required: "Vui l??ng nh???p gi?? b??n",
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
                              S??? l?????ng
                            </label>
                            <input
                              type="text"
                              name="amount"
                              className="form-control"
                              placeholder="Nh???p s??? l?????ng"
                              style={setStyleValidate("amount")}
                              {...register("amount", {
                                required: "Vui l??ng nh???p s??? l?????ng",
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
                        <h3>Th??ng tin nh?? xu???t b???n</h3>
                        <div className="form-group">
                          <Controller
                            name="publisherId"
                            className="form-control"
                            control={control}
                            rules={{
                              required: "Vui l??ng ch???n nh?? xu???t b???n",
                            }}
                            style={setStyleValidate("publisherId")}
                            render={({ field: { onChange, value } }) => (
                              <ReactSelect
                                placeholder="Ch???n nh?? xu???t b???n"
                                title="Th??m nh?? xu???t b???n m???i"
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
                        <h3>Th??ng tin nh?? cung c???p</h3>
                        <div className="form-group">
                          <Controller
                            name="supplierId"
                            className="form-control"
                            control={control}
                            rules={{
                              required: "Vui l??ng ch???n nh?? cung c???p",
                            }}
                            style={setStyleValidate("supplierId")}
                            render={({ field: { onChange, value } }) => (
                              <ReactSelect
                                placeholder="Ch???n nh?? cung c???p"
                                title="Th??m nh?? cung c???p m???i"
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
                        <h3>Th??ng tin t??c gi???</h3>
                        <div className="form-group">
                          <Controller
                            name="authorId"
                            className="form-control"
                            control={control}
                            rules={{
                              required: "Vui l??ng ch???n t??c gi???",
                            }}
                            style={setStyleValidate("authorId")}
                            render={({ field: { onChange, value } }) => (
                              <ReactSelect
                                placeholder="Ch???n t??c gi???"
                                title="Th??m t??c gi??? m???i"
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
                        <label>Danh m???c s??ch</label>
                        <Controller
                          name="categoryId"
                          className="form-control"
                          control={control}
                          rules={{ required: "Vui l??ng ch???n danh m???c" }}
                          style={setStyleValidate("categoryId")}
                          render={({ field: { onChange, value } }) => (
                            <ReactSelect
                              placeholder="Ch???n danh m???c s??ch"
                              components={{ MenuList, Option: OptionCustom }}
                              title="Th??m danh m???c m???i"
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
                        <label>Th??? lo???i s??ch</label>
                        <Controller
                          name="tagId"
                          className="form-control"
                          control={control}
                          rules={{ required: "Vui l??ng ch???n b??i vi???t cha" }}
                          style={setStyleValidate("tagId")}
                          render={({ field: { onChange, value } }) => (
                            <ReactSelect
                              placeholder="Ch???n th??? lo???i s??ch"
                              title="Th??m th??? lo???i s??ch"
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
                        <label>???nh b??a</label>
                        <input
                          type="file"
                          onChange={(e) => handleChangeImage(e)}
                        />
                        <div className="image-post">
                          <img src={avtImage || "/img/no-image.png"} />
                          <div className="overlay">T???i l??n h??nh ???nh</div>
                        </div>
                        <span className="text-danger">
                          {errorImages.message}
                        </span>
                      </div>
                      <div className="template-post-content">
                        <label>Ki???u b??a</label>
                        <Controller
                          name="form_style"
                          className="form-control"
                          control={control}
                          rules={{
                            required: "Vui l??ng ch???n ki???u b??a s??ch",
                          }}
                          style={setStyleValidate("form_style")}
                          render={({ field: { onChange, value } }) => (
                            <ReactSelect
                              placeholder="Ch???n ki???u b??a s??ch"
                              title="Th??m ki???u b??a m???i"
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
                      C???p nh???t
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

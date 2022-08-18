import React, { useState, useEffect, useRef, useMemo } from "react";
// import Header from "../../components/Header";\
import HeaderPost from "../../components/HeaderPost";
import SideBar from "../../components/SideBar";
import LogOutModal from "../../components/modals/LogOutModal";
import Head from "next/head";
import Editor from "../../components/Editor";
import uploadService from "../../services/uploadService/uploadService";
import UploadImageModal from "../../components/modals/UploadImageModal";
import { useForm, Controller } from "react-hook-form";
import { convertQueryToJson } from "../../utils/convertQueryToJson";
import questionService from "../../services/questionService/questionService";
import Router from "next/router";

const createQuestion = () => {
  const editorDefault = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const [dataEditor, setDataEditor] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  const url = convertQueryToJson();

  const [errorCkEditor, setErrorCkEditor] = useState({
    message: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const setStyleValidate = (name) =>
    errors[name] ? { border: "1px solid red" } : null;

  useEffect(() => {
    setEditorLoaded(true);
    findQuestionById();
  }, []);

  useEffect(() => {
    window.addEventListener("uploadImage", () => {
      setUploadImageModal(true);
    });
  }, []);

  const findQuestionById = async () => {
    try {
      const response = await questionService.findQuestionById({
        id: url.id,
      });
      setDataEditor(response.data.answer);
      console.log(response.data);
      reset(response.data);
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

  const onSubmit = async (data) => {
    try {
      if (!url.id) {
        await questionService.createQuestion({
          type: "FREQUENTLY",
          question: data.question,
          answer: dataEditor,
        });
        Router.push("/questions");
      } else {
        await questionService.findQuestionByIdAndUpdate({
          id: url.id,
          dataUpdate: {
            question: data.question,
            answer: dataEditor,
          },
        });
        Router.push("/questions");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  };

  const handleError = () => {
    if (!dataEditor) {
      setErrorCkEditor({
        message: "Vui lòng nhập câu trả lời",
      });
    }
  };

  return (
    <>
      <Head>
        <title>
          {url.id ? "Chỉnh sửa câu hỏi thường gặp" : "Tạo mới câu hỏi"}
        </title>
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
                <HeaderPost title={"Câu hỏi thường gặp"} />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="ckeditor ">
                    <div className="left-content question">
                      <div className="ckeditor-content">
                        <h3>Nội dung</h3>
                        <div className="form-group">
                          <label className="profile_details_text">
                            Câu hỏi
                          </label>
                          <input
                            type="text"
                            name="question"
                            className="form-control"
                            placeholder="Nhập câu hỏi thường gặp"
                            style={setStyleValidate("question")}
                            {...register("question", {
                              required: "Vui lòng nhập câu hỏi thường gặp",
                            })}
                          />
                          {errors.question && (
                            <span className="text-danger">
                              {errors.question.message}
                            </span>
                          )}
                        </div>
                        <label className="profile_details_text">
                          Câu trả lời
                        </label>
                        <Editor
                          name="eidtor"
                          onChange={(data) => {
                            setErrorCkEditor({
                              message: "",
                            });
                            setDataEditor(data);
                          }}
                          value={dataEditor}
                          editorLoaded={editorLoaded}
                          editorDefault={(editor) =>
                            (editorDefault.current = editor)
                          }
                        />
                        <span className="text-danger">
                          {errorCkEditor.message}
                        </span>
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

export default createQuestion;

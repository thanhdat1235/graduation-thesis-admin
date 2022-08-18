/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { checkUrl } from "../../utils/checkUrl";

const ModalUploadImagePost = ({
  visible,
  closeModal,
  onSubmit,
  handleChangeFile,
}) => {
  const [linkImage, setLinkImage] = useState("");

  useEffect(() => {
    setLinkImage("");
  }, [visible]);

  const handleLinkImage = () => {
    if (linkImage) {
      if (checkUrl(linkImage)) {
        onSubmit({
          linkImage: linkImage,
        });
      } else {
        toast.error("Link hình ảnh không đúng định dạng!");
      }
    }
  };

  return (
    <>
      <Modal
        isOpen={visible}
        onRequestClose={closeModal}
        contentLabel="My dialog"
        className="mymodal h-auto"
        overlayClassName="myoverlay"
        ariaHideApp={false}
      >
        <div className="modal-header d-flex justify-content-between align-items-center">
          <>
            <h5>Thêm hình ảnh</h5>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                closeModal();
              }}
            >
              <i className="fas fa-times text-gray-dark"></i>
            </a>
          </>
        </div>
        <div className="modal-body">
          <div className="w-100">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label htmlFor="linkImage">Đường dẫn hình ảnh của bạn</label>
                  <input
                    value={linkImage}
                    className="form-control"
                    type="text"
                    onChange={(e) => setLinkImage(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Hoặc</label>
                </div>
                {/* <buton
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    openModalChooseImage();
                    closeModal();
                  }}
                >
                  Chọn hình ảnh từ thư viện
                </buton> */}
                <input type="file" onChange={handleChangeFile} />
              </div>
            </div>

            <div className="row justify-content-end">
              <div className="col-lg-9 d-flex align-items-center justify-content-end mt-4">
                <button
                  type="button"
                  className="btn btn-secondary --btn-save text-dark bg-white mt-0 border"
                  onClick={closeModal}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn btn-primary --btn-save mt-0 ml-2"
                  onClick={handleLinkImage}
                >
                  Thêm hình ảnh
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalUploadImagePost;

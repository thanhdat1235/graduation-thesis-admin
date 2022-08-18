import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import bookService from "../../services/bookService/bookService";

Modal.setAppElement("body");

const AddSupplierModal = ({
  isOpen,
  closeModal,
  openModal,
  onReload,
  publisherId,
}) => {
  const [publisher, setPublisher] = useState({
    name: "",
    phone_number: "",
    email: "",
  });
  const handleSubmit = async () => {
    try {
      await bookService.createSupplier({
        name: publisher.name,
        phone_number: publisher.phone_number,
        email: publisher.email,
        publisherId: publisherId,
      });
      closeModal();
      onReload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="My dialog"
      className="mymodal modal-remove"
      overlayClassName="myoverlay"
    >
      <h5 className="modal-header d-block font-weight-bold text-center">
        Thêm nhà cung cấp mới
      </h5>
      <div className="container mt-3 mb-4">
        <div className="w-100">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-10">
              <div className="form-group">
                <label>
                  Tên nhà cung cấp <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) =>
                    setPublisher({
                      ...publisher,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>
                  Số điện thoại <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) =>
                    setPublisher({
                      ...publisher,
                      phone_number: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) =>
                    setPublisher({
                      ...publisher,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center mt-4">
            <button
              className="btn btn-secondary --btn-save text-dark bg-white mt-0 border"
              type="button"
              onClick={closeModal}
            >
              Hủy
            </button>
            <button
              className="btn btn-primary --btn-save mt-0 ml-2"
              onClick={handleSubmit}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddSupplierModal;

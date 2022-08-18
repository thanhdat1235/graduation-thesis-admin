import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

Modal.setAppElement("body");

const ConfirmModal = ({ isOpen, closeModal, onDelete }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="My dialog"
        className="mymodal modal-remove"
        overlayClassName="myoverlay"
      >
        <div className="modal-body d-block">
          Bạn có chắc chắn muốn xóa không?
        </div>
        <div className="modal-footer d-flex align-items-center justify-content-end">
          <button
            onClick={closeModal}
            className="btn btn-secondary --btn-save text-dark bg-white ml-2 mt-0 border"
            type="button"
          >
            Hủy
          </button>
          <button
            className="btn btn-primary --btn-save mt-0"
            type="button"
            onClick={onDelete}
          >
            Đồng ý
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmModal;

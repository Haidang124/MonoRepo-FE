import React from "react";
import { useRoleContext } from "../RoleContext";
import { Modal } from "react-bootstrap";
import { KTSVG } from "../../../../../../_metronic/helpers";

const RoleModal: React.FC = () => {
  const {modal, setModal} = useRoleContext();

  const handleCloseModal = () => {
    const newModal = {...modal};
    newModal.show = false;
    setModal(newModal);
  };

  const handleDataChange = (e: any) => {
    const newModal = {...modal};
    newModal.data = e.target.value;
    setModal(newModal);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      modal.onSubmit(modal.data);
      handleCloseModal();
    }
  };

  const handleOk = (e: any) => {
    modal.onSubmit(modal.data);
    handleCloseModal();
  }
  return (
    <>
      <Modal
        show={modal.show}
        keyboard={false}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modal.title}</h5>
            <div
              className="btn btn-icon btn-sm btn-active-light-primary ms-2"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              <KTSVG
                path="/media/icons/duotune/arrows/arr061.svg"
                className="svg-icon svg-icon-2x"
              />
            </div>
          </div>
          <div className="modal-body">
            <input
              className="form-control"
              value={modal.data}
              onChange={handleDataChange}
              onKeyPress={(event) => handleKeyPress(event)}
              placeholder="Tên vai trò"
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleOk}>
              OK
            </button>
          </div>
        </div>

      </Modal>
    </>
  );
}

export default RoleModal;

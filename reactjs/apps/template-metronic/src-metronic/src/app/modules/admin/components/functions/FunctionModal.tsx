import React from 'react'
import {useFunctionContext} from './FunctionContext'
import {Button, Modal} from 'react-bootstrap'
// import SelectEndPoint from './FunctionSelectEndpoint'

const FunctionModal: React.FC = () => {
  const {modal, setModal} = useFunctionContext()

  const handleCloseModal = () => {
    const newModal = {...modal}
    newModal.show = false
    setModal(newModal)
  }

  const handleDataChange = (e: any) => {
    const newModal = {...modal}
    newModal.data = e.target.value
    setModal(newModal)
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      modal.onSubmit(modal.data, modal.endPoint, modal.type)
      handleCloseModal()
    }
  }

  const handleOk = (e: any) => {
    modal.onSubmit(modal.data, modal.endPoint, modal.type)
    handleCloseModal()
  }

  return (
    <>
      <Modal
        title={modal.title}
        show={modal.show}
        onHide={handleCloseModal}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='form-group'>
            <input
              className='form-control'
              value={modal.data}
              onChange={handleDataChange}
              onKeyPress={(event) => handleKeyPress(event)}
              placeholder='Tên chức năng'
            />
          </div>

          {/* {((modal.edit && modal.endPoint.length > 0) || !modal.edit) && <SelectEndPoint />} */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant='primary' onClick={handleOk}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default FunctionModal

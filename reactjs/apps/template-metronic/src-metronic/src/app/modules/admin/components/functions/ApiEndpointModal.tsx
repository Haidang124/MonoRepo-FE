import React from 'react'
import {useFunctionContext} from './FunctionContext'
import {Button, Modal} from 'react-bootstrap'
import {getTreeFunctionDetails, updateFunctionApiEndpoints} from '../../redux/FunctionCRUD'

const ApiEndpointModal: React.FC = () => {
  const {
    setFunctionDetails,
    showApiEndpointModal,
    setShowApiEndpointModal,
    apiEndpoints,
    checkApis,
    setCheckApis,
    currentFunction,
  } = useFunctionContext()

  const handleCloseModal = () => setShowApiEndpointModal(false)

  const handleOk = (e: any) => {
    updateFunctionApiEndpoints({functionId: currentFunction?.id, apiEndpointIds: checkApis}).then(
      () => {
        getTreeFunctionDetails().then((res) => {
          setFunctionDetails(res.data)
          setShowApiEndpointModal(false)
        })
      }
    )
  }

  return (
    <Modal
      title='Thêm API Endpoint'
      show={showApiEndpointModal}
      onHide={handleCloseModal}
      size='lg'
      backdrop='static'
      keyboard={false}
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm API Endpoint</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div data-kt-buttons='true'>
          {apiEndpoints.map((apiEndPoint, index: number) => (
            <label
              key={index}
              className='btn btn-outline btn-outline-dashed d-flex flex-stack text-start px-4 py-2 mb-2'
            >
              <div className='d-flex align-items-center me-2'>
                <div className='form-check form-check-custom form-check-solid form-check-primary me-6'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    checked={checkApis.includes(apiEndPoint.id)}
                    onChange={() => {
                      const newCheckApis = [...checkApis]
                      if (newCheckApis.includes(apiEndPoint.id)) {
                        newCheckApis.splice(newCheckApis.indexOf(apiEndPoint.id), 1)
                      } else {
                        newCheckApis.push(apiEndPoint.id)
                      }
                      setCheckApis(newCheckApis)
                    }}
                  />
                </div>

                <div className='flex-grow-1'>
                  <div className='d-flex align-items-center fs-4 fw-bolder flex-wrap'>
                    {apiEndPoint.httpMethod} - {apiEndPoint.path}
                  </div>
                  <div className='opacity-50'>
                    <small>{apiEndPoint.summary}</small>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
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
  )
}

export default ApiEndpointModal

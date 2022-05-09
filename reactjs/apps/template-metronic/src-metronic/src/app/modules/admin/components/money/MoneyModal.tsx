import React from 'react'
import {Modal, Row} from 'react-bootstrap'
import {useMoneyContext} from './MoneyContext'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {MoneyType} from '../../models/MoneyModel'

const MoneyModal: React.FC = () => {
  const {modal, setModal} = useMoneyContext()
  const MoneyModalSchema = Yup.object().shape({
    name: Yup.string().required('Nhập tên'),
  })

  const handleCloseModal = () => {
    const newModal = {...modal}
    newModal.show = false
    setModal(newModal)
  }

  const handleOk = (values: any) => {
    const newModal = {...modal}
    newModal.data = {
      name: values.name,
      description: values.description,
    }
    setModal(newModal)
    modal.onSubmit(newModal.data)
    handleCloseModal()
  }
  return (
    <>
      <Modal
        show={modal.show}
        keyboard={false}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: modal.data.name,
            description: modal.data.description,
          }}
          validationSchema={MoneyModalSchema}
          onSubmit={handleOk}
        >
          {({values, errors, setFieldValue, isSubmitting}) => (
            <Form>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>{modal.title}</h5>
                  <div
                    className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                    onClick={handleCloseModal}
                    aria-label='Close'
                  >
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr061.svg'
                      className='svg-icon svg-icon-2x'
                    />
                  </div>
                </div>
                <div className='modal-body'>
                  <Row className='mb-3'>
                    <label className='form-label required'>
                      {modal.type === MoneyType.Income ? 'Khoản thu' : 'Khoản chi'}
                    </label>
                    <Field
                      className='form-control'
                      name='name'
                      type='text'
                      placeholder={
                        modal.type === MoneyType.Income ? 'Nhập khoản thu' : 'Nhập khoản chi'
                      }
                    />
                    {errors.name ? <div className='error-text'>{errors.name}</div> : null}
                  </Row>
                  <Row className='mb-3'>
                    <label className='form-label'>Mô tả</label>
                    <Field
                      className='form-control'
                      name='description'
                      type='text'
                      placeholder='Nhập mô tả'
                    />
                  </Row>
                </div>
                <div className='modal-footer'>
                  <button type='submit' className='btn btn-light' onClick={handleCloseModal}>
                    Close
                  </button>
                  <button type='submit' className='btn btn-primary'>
                    OK
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default MoneyModal

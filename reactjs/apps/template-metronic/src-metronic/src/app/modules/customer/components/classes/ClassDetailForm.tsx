import {Form, Formik} from 'formik'
import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import {useLocation, useNavigate} from 'react-router-dom'
import Select from 'react-select'
import * as Yup from 'yup'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {styleSelectBox} from '../../../admin/components/common/styles/StyleSelectBox'
import './styles/classDetailForm.scss'

const ClassDetailForm: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation() as any
  const {data} = location.state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialValues, setInitialValues] = useState(data)
  const ClassSchema = Yup.object().shape({})
  useEffect(() => {
    // getAllClasses().then((res: any) => {
    //   setClasses(res.data.data)
    // })
    // getClassById(data.id).then((res: any) => {
    //   setInitialValues(res.data.data)
    // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const TableInfo: React.FC = (values: any) => {
    return (
      <table className='class-detail-table'>
        <tr>
          <th>STT</th>
          <th>TÊN LỚP</th>
          <th>LỊCH HỌC</th>
          <th>XÓA</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Smart Garten 101</td>
          <td>19:30 - Thứ 2; 9:00 - Chủ nhật</td>
          <td>
            <i className='fa fa-trash' onClick={() => {}}></i>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Smart Garten 103</td>
          <td>19:30 - Thứ 2; 9:00 - Chủ nhật</td>
          <td>
            <i className='fa fa-trash' onClick={() => {}}></i>
          </td>
        </tr>
      </table>
    )
  }
  const handleSubmit = (values: any) => {}
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={ClassSchema}
      onSubmit={handleSubmit}
    >
      {({values, errors, touched, setFieldValue}) => (
        <Form className='class-detail-form fs-6'>
          <Row>
            <Col className='col-xl-8 col-12'>
              <div className='card'>
                <div className='card-body form-detail'>
                  <div className='d-flex justify-content-center'>
                    <h3>{`THAY ĐỔI ${data?.type}`}</h3>
                  </div>
                  <div className='class-form-content mt-4'>
                    <Row className='mx-4'>
                      <Col>
                        <div className='d-flex justify-content-start align-items-start form-group'>
                          <label className='form-label required mt-4'>{`Chọn ${data.type.toLocaleLowerCase()} mới`}</label>
                          <Col>
                            <Select
                              styles={styleSelectBox}
                              className='basic-select w-100'
                              // options={departments}
                              // defaultValue={initialValues?.parent}
                              // getOptionLabel={(option: any) => option.name}
                              // getOptionValue={(option: any) => option.id}
                              // onChange={(e) => {
                              //   setFieldValue('parent', e)
                              // }}
                            />
                          </Col>
                        </div>
                      </Col>
                    </Row>
                    <div className='accordion accordion-icon-toggle' id='kt_accordion_3'>
                      <div
                        className='accordion-header py-3 d-flex'
                        data-bs-toggle='collapse'
                        data-bs-target='#kt_accordion_3_item_1'
                      >
                        <span className='accordion-icon'>
                          <span className='svg-icon svg-icon-4'>
                            <SVG src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')} />
                          </span>
                        </span>
                        <h3 className='fs-4 fw-bold mb-0 ms-4'>
                          {`THÔNG TIN LỚP HỌC ${data?.type} ĐƯỢC PHÂN CÔNG`}
                        </h3>
                      </div>
                      <div className='accordion-body collapse show' id='kt_accordion_3_item_1'>
                        <TableInfo />
                      </div>
                    </div>
                    <div className='accordion accordion-icon-toggle' id='kt_accordion_3'>
                      <div
                        className='accordion-header py-3 d-flex'
                        data-bs-toggle='collapse'
                        data-bs-target='#kt_accordion_3_item_2'
                      >
                        <span className='accordion-icon'>
                          <span className='svg-icon svg-icon-4'>
                            <SVG src={toAbsoluteUrl('/media/icons/duotune/arrows/arr064.svg')} />
                          </span>
                        </span>
                        <h3 className='fs-4 fw-bold mb-0 ms-4'>
                          {`THÔNG TIN LỚP HỌC ${data?.type} ĐANG PHỤ TRÁCH`}
                        </h3>
                      </div>
                      <div className='accordion-body collapse show' id='kt_accordion_3_item_2'>
                        <TableInfo />
                      </div>
                    </div>
                  </div>
                  <div className='footer d-flex justify-content-end'>
                    <Button className='btn btn-secondary mx-4' onClick={() => navigate(-1)}>
                      Hủy bỏ
                    </Button>
                    <Button className='btn btn-primary' type='submit'>
                      Hoàn tất
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}
export default ClassDetailForm

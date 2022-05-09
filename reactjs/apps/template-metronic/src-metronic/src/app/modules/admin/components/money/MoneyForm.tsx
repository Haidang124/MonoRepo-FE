import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useLocation, useNavigate} from 'react-router-dom'
import {
  ExpenseModel,
  IncomeModel,
  MoneyCategoryOption,
  MoneyModel,
  MoneyTemplateOption,
  MoneyType,
  MoneyTypeOption,
} from '../../models/MoneyModel'
import {Field, Form, Formik} from 'formik'
import {Button, Col, Row} from 'react-bootstrap'
import Select from 'react-select'
import NumberFormat from 'react-number-format'
import {useMoneyContext} from './MoneyContext'
import MoneyModal from './MoneyModal'
import {toast} from 'react-toastify'
import {createMoney, getMoneyId, updateMoney} from '../../redux/MoneyCRUD'

const MoneyForm: React.FC = () => {
  const MoneySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  })
  const {state} = useLocation()
  const navigate = useNavigate()
  const {modal, setModal} = useMoneyContext()
  const [incomes, setIncomes] = useState<IncomeModel[]>([])
  const [expenses, setExpenses] = useState<ExpenseModel[]>([])
  const [money, setMoney] = useState<MoneyModel>({} as MoneyModel)

  useEffect(() => {
    if (state) {
      getMoneyId(state).then((res) => {
        setMoney(res.data.data)
        setIncomes(res.data.data.incomes)
        setExpenses(res.data.data.expenses)
      })
    }
  }, [state])
  const handleSubmit = (values: any) => {
    const newMoney = {
      name: values.name,
      moneyType: values.moneyType,
      moneyCategory: values.moneyCategory,
      moneyTemplate: values.moneyTemplate,
      price: values.price,
      unit: values.unit,
      description: values.description,
      incomes: incomes,
      expenses: expenses,
    }
    if (!state) {
      createMoney(newMoney).then((res) => {
        if (res.status === 200) {
          toast('Thêm khoản tiền thành công')
        }
      })
    } else {
      updateMoney(state, newMoney).then((res) => {
        if (res.status === 200) {
          toast('Cập nhật khoản tiền thành công')
        }
      })
    }
  }
  const handleShowModal = (moneyType: any) => {
    if (moneyType != null) {
      setModal({
        data: modal.data,
        onSubmit: (data: any) => {
          if (moneyType === MoneyType.Income) {
            const newIncomes = [...incomes, {name: data.name, description: data.description}]
            setIncomes(newIncomes)
          } else {
            const newExpenses = [...expenses, {name: data.name, description: data.description}]
            setExpenses(newExpenses)
          }
        },
        show: true,
        type: moneyType,
        title: moneyType === MoneyType.Income ? 'Danh mục khoản thu' : 'Danh mục khoản chi',
      })
    }
  }
  const handleEditIncome = (value: any, type: any, index: number) => {
    const newModal = {
      data: {name: value.name, description: value.description},
      onSubmit: (data: any) => {
        if (type === MoneyType.Income) {
          const newIncome = {name: data.name, description: data.description}
          const newIncomes = [...incomes]
          newIncomes[index] = newIncome
          setIncomes(newIncomes)
        } else {
          const newExpense = {name: data.name, description: data.description}
          const newExpenses = [...expenses]
          newExpenses[index] = newExpense
          setExpenses(newExpenses)
        }
      },
      show: true,
      type: type,
      title: type === MoneyType.Income ? 'Danh mục khoản thu' : 'Danh mục khoản chi',
    }
    setModal(newModal)
  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: money.name,
          moneyType: money.type,
          moneyCategory: money.category,
          moneyTemplate: money.template,
          price: money.price,
          unit: money.unit,
          description: money.description,
          incomes: money.incomes,
          expenses: money.expenses,
        }}
        validationSchema={MoneySchema}
        onSubmit={handleSubmit}
      >
        {({values, errors, setFieldValue, isSubmitting}) => (
          <Form>
            <Row>
              <Col className='col-xl-24 col-12'>
                <div className='center-page card'>
                  <div className='card-body center-info'>
                    <div className='d-flex justify-content-center'>
                      <h3>TẠO MỚI KHOẢN TIỀN</h3>
                    </div>
                    <div className='mt-5'>
                      <Row className='mb-3'>
                        <Col>
                          <div className='d-flex justify-content-center align-items-center form-group'>
                            <label className='form-label required'>Tên khoản tiền</label>
                            <Col>
                              <Field
                                type='text'
                                className='form-control'
                                placeholder='Nhập tên khoản tiền'
                                name='name'
                              />
                            </Col>
                          </div>
                        </Col>
                        <Col>
                          <div className='d-flex align-items-center form-group'>
                            <label className='form-label required'>Phân loại</label>
                            <Col>
                              <Select
                                key={'moneyType'}
                                className='basic-select w-100'
                                classNamePrefix='select'
                                isSearchable={true}
                                options={MoneyTypeOption}
                                value={MoneyTypeOption.find((t) => t.value === values.moneyType)}
                                onChange={(e) => setFieldValue('moneyType', e?.value)}
                              />
                            </Col>
                            <div className='btn-add'>
                              <i
                                className='fa fa-plus'
                                aria-hidden='true'
                                onClick={() => handleShowModal(values.moneyType)}
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {incomes.length > 0 && (
                        <div>
                          <h5>KHOẢN THU</h5>
                          <div className='table-responsive'>
                            <table className='table table-bordered table-striped'>
                              <thead>
                                <tr className='fw-bold fs-6 text-muted'>
                                  <th>STT</th>
                                  <th>Khoản tiền</th>
                                  <th>Mô tả</th>
                                  <th>Tác vụ</th>
                                </tr>
                              </thead>
                              <tbody className='fs-6'>
                                {incomes.map((element, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{element.name}</td>
                                    <td>{element.description}</td>
                                    <td>
                                      <button
                                        className='btn btn-sm btn-clean btn-icon btn-icon-md'
                                        onClick={() =>
                                          handleEditIncome(element, values.moneyType, index)
                                        }
                                      >
                                        <i className='fas fa-edit mx-3' />
                                      </button>
                                      <button
                                        className='btn btn-sm btn-clean btn-icon btn-icon-md'
                                        onClick={() => incomes.splice(index, 1)}
                                      >
                                        <i className='fa fa-trash' />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      {expenses.length > 0 && (
                        <div>
                          <h5>KHOẢN CHI</h5>
                          <div className='table-responsive'>
                            <table className='table table-bordered table-striped'>
                              <thead>
                                <tr className='fw-bold fs-6 text-muted'>
                                  <th>STT</th>
                                  <th>Khoản tiền</th>
                                  <th>Mô tả</th>
                                  <th>Tác vụ</th>
                                </tr>
                              </thead>
                              <tbody className='fs-6'>
                                {expenses.map((element, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{element.name}</td>
                                    <td>{element.description}</td>
                                    <td>
                                      <button
                                        className='btn btn-sm btn-clean btn-icon btn-icon-md'
                                        onClick={() => {
                                          navigate(`/admin/moneyForm`, {state: element.id})
                                        }}
                                      >
                                        <i className='fas fa-edit mx-3' />
                                      </button>
                                      <button
                                        className='btn btn-sm btn-clean btn-icon btn-icon-md'
                                        onClick={() => expenses.splice(index, 1)}
                                      >
                                        <i className='fa fa-trash' />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      <Row className='mb-3'>
                        <Col>
                          <div className='d-flex justify-content-center align-items-center form-group'>
                            <label className='form-label required'>Danh mục</label>
                            <Col>
                              <Select
                                key={'moneyCategory'}
                                className='basic-select w-100'
                                classNamePrefix='select'
                                isSearchable={true}
                                options={MoneyCategoryOption}
                                value={MoneyCategoryOption.find(
                                  (t) => t.value === values.moneyCategory
                                )}
                                onChange={(e) => setFieldValue('moneyCategory', e?.value)}
                              />
                            </Col>
                          </div>
                        </Col>
                        <Col>
                          <div className='d-flex justify-content-center align-items-center form-group'>
                            <label className='form-label required'>Mẫu phiếu</label>
                            <Col>
                              <Select
                                key={'moneyTemplate'}
                                className='basic-select w-100'
                                classNamePrefix='select'
                                isSearchable={true}
                                options={MoneyTemplateOption}
                                value={MoneyTemplateOption.find(
                                  (t) => t.value === values.moneyTemplate
                                )}
                                onChange={(e) => setFieldValue('moneyTemplate', e?.value)}
                              />
                            </Col>
                          </div>
                        </Col>
                      </Row>
                      <Row className='mb-3'>
                        <Col>
                          <div className='d-flex justify-content-center align-items-center form-group'>
                            <label className='form-label'>Giá tiền</label>
                            <NumberFormat
                              className='form-control'
                              placeholder='Nhập giá tiền'
                              thousandSeparator={true}
                              name='price'
                              value={values.price}
                              onValueChange={(values) => setFieldValue('price', values.value)}
                            />
                          </div>
                        </Col>
                        <Col>
                          <div className='d-flex justify-content-center align-items-center form-group'>
                            <label className='form-label'>Đơn vị tính</label>
                            <Field
                              className='form-control'
                              placeholder='Nhập đươn vị tính'
                              name='unit'
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row className='mb-3'>
                        <div className='d-flex justify-content-center align-items-center form-group'>
                          <label className='form-label'>Mô tả</label>
                          <Col>
                            <Field
                              type='text'
                              className='form-control'
                              placeholder='Mô tả chi tiết'
                              name='description'
                            />
                          </Col>
                        </div>
                      </Row>
                    </div>
                    <div className='footer d-flex justify-content-end'>
                      <Button className='btn btn-secondary' onClick={() => navigate(-1)}>
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
      <MoneyModal />
    </>
  )
}
export default MoneyForm

import React, {useEffect, useState} from 'react'

import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import {GenderOptions, UserModel} from '../../auth/models/UserModel'
import {Form, Formik, Field} from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import moment from 'moment'
import {getUserById, updateProfile} from '../redux/ProfileCRUD'
import {toast} from 'react-toastify'
const UserSchema = Yup.object().shape({
  fullName: Yup.string().required('Nhập họ và tên'),
  email: Yup.string().email('Invalid email').required('Nhập email'),
  gender: Yup.string().required('Nhập giới tính'),
  dob: Yup.string().required('Nhập ngày sinh'),
  phoneNumber: Yup.string().required('Nhập số điệnt thoại'),
  address: Yup.string().required('Nhập địa chỉ'),
})
export const Overview: React.FC = () => {
  const user = useSelector<RootState, UserModel>(({auth}) => auth.user as UserModel, shallowEqual)
  const [userModal, setUserModal] = useState<UserModel>(user)
  useEffect(() => {
    getUserById(user.id).then((res) => setUserModal(res.data))
  }, [user])

  const handleSubmit = (values: any) => {
    let newUser = {
      ...userModal,
      fullName: values.fullName,
      gender: values.gender,
      dob: values.dob,
      phoneNumber: values.phoneNumber,
      email: values.email,
      address: values.address,
    }
    updateProfile(newUser).then((res) => {
      if (res.status === 200) {
        toast('Cập nhật tài khoản thành công')
      }
    })
  }
  return (
    <div className=' row g-5 g-xxl-8 card shadow-sm'>
      <Formik
        enableReinitialize={true}
        initialValues={{...userModal, dob: moment(userModal.dob).format('YYYY-MM-DD')}}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        {({values, errors, touched, setFieldValue}) => (
          <Form>
            <div className='d-flex'>
              <div className='col-xl-12'>
                <div className='mb-10 ps-5'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Username
                  </label>
                  <Field
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Username'
                    name='username'
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className='d-flex'>
              <div className='col-xl-6'>
                <div className='mb-10 ps-5'>
                  <label htmlFor='exampleFormControlInput' className='required form-label'>
                    Họ và tên
                  </label>
                  <Field
                    type='text'
                    className='form-control'
                    placeholder='Nhập họ và tên'
                    name='fullName'
                  />
                  {errors.fullName ? <div className='error-text'>{errors.fullName}</div> : null}
                </div>
              </div>
              <div className='col-xl-6'>
                <div className='mb-10 ps-5'>
                  <label htmlFor='exampleFormControlInput' className='required form-label'>
                    Giới tính
                  </label>
                  <Select
                    key={'genderType'}
                    className='basic-select'
                    classNamePrefix='select'
                    isSearchable={true}
                    options={GenderOptions}
                    value={GenderOptions.find((t) => t.value === values.gender)}
                    onChange={(e) => setFieldValue('gender', e?.value)}
                  />
                </div>
              </div>
            </div>
            <div className='d-flex'>
              <div className='col-xl-6'>
                <div className='mb-10 ps-5'>
                  <label htmlFor='exampleFormControlInput' className='required form-label'>
                    Ngày sinh
                  </label>
                  <Field
                    type='date'
                    className='form-control '
                    placeholder='Nhập ngày sinh'
                    name='dob'
                  />
                </div>
                {errors.dob ? <div className='error-text'>{errors.dob}</div> : null}
              </div>
              <div className='col-xl-6'>
                <div className='mb-10 ps-5'>
                  <label htmlFor='exampleFormControlInput' className='required form-label'>
                    Điện thoại
                  </label>
                  <Field
                    type='text'
                    className='form-control '
                    placeholder='Nhập số điện thoại'
                    name='phoneNumber'
                  />
                  {errors.phoneNumber ? (
                    <div className='error-text'>{errors.phoneNumber}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='d-flex'>
              <div className='col-xl-6'>
                <div className='mb-10 ps-5'>
                  <label htmlFor='exampleFormControlInput' className='required form-label'>
                    Email
                  </label>
                  <Field
                    type='text'
                    className='form-control '
                    placeholder='Nhập Email'
                    name='email'
                  />
                  {errors.email ? <div className='error-text'>{errors.email}</div> : null}
                </div>
              </div>
              <div className='col-xl-6'>
                <div className='mb-10 ps-5'>
                  <label htmlFor='exampleFormControlInput' className='required form-label'>
                    Địa chỉ
                  </label>
                  <Field
                    type='text'
                    className='form-control '
                    placeholder='Nhập địa chỉ'
                    name='address'
                  />
                  {errors.address ? <div className='error-text'>{errors.address}</div> : null}
                </div>
              </div>
            </div>

            <div className='text-center justify-content-center'>
              <button type='submit' id='kt_sign_in_submit' className='btn btn-lg btn-primary mb-5'>
                Cập nhật
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

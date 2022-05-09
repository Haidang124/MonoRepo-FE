import React from "react";
import Select from "react-select";
import {GenderOptions} from "../../../../auth/models/UserModel";

const ParentsInfo: React.FC = () => {
    return (
        <div className='parents-info'>
            <h3>THÔNG TIN PHỤ HUYNH</h3>
            <div className='mb-5'>
                <div className='form-label required'>Họ và tên</div>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Nhập họ và tên'
                />
            </div>
            <div className='row align-items-center mb-5'>
                <div className='col  align-items-center'>
                    <div className='form-label'>Ngày sinh</div>
                    <input
                        type='date'
                        className='form-control'
                        placeholder='Nhập ngày sinh'
                        // defaultValue={new Date(
                        //     initialValues.representative?.doB as string
                        // ).toLocaleDateString('en-CA')}
                        name='representative.doB'
                        // onChange={formik.handleChange}
                    />
                </div>
                <div className='col  align-items-center'>
                    <div className='w-25 form-label'>Quan hệ</div>
                    <Select
                        className='w-75'
                        placeholder='Giới tính'
                        options={GenderOptions}
                        onChange={(e: any) => {
                        }}
                    />
                </div>
            </div>
            <div className='mb-5'>
                <div className='col-1 form-label required'>Địa chỉ</div>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Nhập địa chỉ'
                />
            </div>
            <div className='row align-items-center mb-5'>
                <div className='col align-items-center'>
                    <div className='form-label'>Số điện thoại</div>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Nhập số điện thoại'
                    />
                </div>
                <div className='col align-items-center'>
                    <div className='form-label'>Email</div>
                    <input
                        type='email'
                        className='form-control'
                        placeholder='Nhập email'
                    />
                </div>
            </div>
        </div>
    )
}

export default ParentsInfo;
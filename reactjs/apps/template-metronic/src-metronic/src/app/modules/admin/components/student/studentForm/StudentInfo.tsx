import React from "react";
import Select from "react-select";
import {GenderOptions} from "../../../../auth/models/UserModel";
import { styleSelectBox } from "../../common/styles/StyleSelectBox";

const StudentInfo: React.FC = () => {
    return (
        <>
            <h3>THÔNG TIN HỌC VIÊN</h3>
            <div className='align-items-center mb-5'>
                <div className='form-label required'>Họ và tên</div>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Nhập họ và tên'
                />
            </div>
            <div className='row align-items-center mb-5'>
                <div className='col align-items-center'>
                    <div className='w-25 form-label'>Giới tính</div>
                    <Select
                        className='w-75'
                        placeholder='Giới tính'
                        styles={styleSelectBox}
                        options={GenderOptions}
                        // value={GenderOptions.find(
                        //     (t) => t.value === formik.values.representative?.gender
                        // )}
                        onChange={(e: any) => {
                        }}
                    />
                </div>
                <div className='col align-items-center'>
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
            </div>
            <div className='align-items-center mb-5'>
                <div className='col-1 form-label required'>Trường học</div>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Nhập tên trường học mà học viên đang theo học'
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
            <div className='align-items-center mb-5'>
                <div className='col-1 form-label required'>Địa chỉ</div>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Nhập địa chỉ'
                />
            </div>
            <div className='align-items-center mb-5'>
                <div className='col-1 form-label'>Tính cách</div>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Nhập tính cách'
                />
            </div>
            <div className='align-items-center mb-5'>
                <div className='col-1 form-label'>Sở thích</div>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Nhập sở thích'
                />
            </div>
            <div className='align-items-center mb-5'>
                <div className='col-1 form-label'>Ghi chú</div>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Nhập ghi chú'
                />
            </div>
        </>
    );
}

export default StudentInfo;
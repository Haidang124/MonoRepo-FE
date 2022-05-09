import React from "react";
import Select from "react-select";
import {GenderOptions} from "../../../../auth/models/UserModel";

const DetailInfo: React.FC = () => {
    return (
        <div className='detail-info'>
            <h3>THÔNG TIN CHI TIẾT</h3>
            <div className='mb-5'>
                <div className='form-label required'>Chi nhánh</div>
                <Select
                    placeholder=''
                    options={GenderOptions}
                    // value={GenderOptions.find(
                    //     (t) => t.value === formik.values.representative?.gender
                    // )}
                    onChange={(e: any) => {
                    }}
                />
            </div>
            <div className='mb-5'>
                <div className='form-label required'>Trạng thái</div>
                <Select
                    placeholder=''
                    options={GenderOptions}
                    // value={GenderOptions.find(
                    //     (t) => t.value === formik.values.representative?.gender
                    // )}
                    onChange={(e: any) => {
                    }}
                />
            </div>
            <div className='mb-5'>
                <div className='form-label required'>Tư vấn viên</div>
                <Select
                    placeholder=''
                    options={GenderOptions}
                    // value={GenderOptions.find(
                    //     (t) => t.value === formik.values.representative?.gender
                    // )}
                    onChange={(e: any) => {
                    }}
                />
            </div>
            <div className='mb-5'>
                <div className='form-label required'>Kênh tuyển sinh</div>
                <Select
                    placeholder=''
                    options={GenderOptions}
                    // value={GenderOptions.find(
                    //     (t) => t.value === formik.values.representative?.gender
                    // )}
                    onChange={(e: any) => {
                    }}
                />
            </div>
            <h3 className='mt-5'>KIỂM TRA ĐẦU VÀO</h3>
            <div className='mb-5'>
                <div className='form-label required'>Môn học</div>
                <Select
                    placeholder=''
                    options={GenderOptions}
                    // value={GenderOptions.find(
                    //     (t) => t.value === formik.values.representative?.gender
                    // )}
                    onChange={(e: any) => {
                    }}
                />
            </div>
            <div className='mb-5'>
                <div className='form-label'>Tên bài kiểm tra</div>
                <input
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-5'>
                <div className='form-label'>Ngày kiểm tra</div>
                <input
                    type='date'
                    className='form-control'
                    // defaultValue={new Date(
                    //     initialValues.representative?.doB as string
                    // ).toLocaleDateString('en-CA')}
                    name='representative.doB'
                    // onChange={formik.handleChange}
                />
            </div>
            <div className='mb-5'>
                <div className='form-label'>Điểm kiểm tra đầu vào</div>
                <input
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-5'>
                <div className='form-label'>Ý kiến của GV:</div>
                <input
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-5'>
                <div className='form-label required'>Khóa học phù hợp</div>
                <Select
                    placeholder=''
                    options={GenderOptions}
                    // value={GenderOptions.find(
                    //     (t) => t.value === formik.values.representative?.gender
                    // )}
                    onChange={(e: any) => {
                    }}
                />
            </div>
            <h3>TÀI KHOẢN PHỤ HUYNH</h3>
            <div className='mb-5'>
                <div className='form-label'>Tài khoản</div>
                <input
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-5'>
                <div className='form-label'>Mật khẩu</div>
                <input
                    type='text'
                    className='form-control'
                />
            </div>
            <h3>TÀI KHOẢN HỌC VIÊN</h3>
            <div className='mb-5'>
                <div className='form-label'>Tài khoản</div>
                <input
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-5'>
                <div className='form-label'>Mật khẩu</div>
                <input
                    type='text'
                    className='form-control'
                />
            </div>
        </div>
    );
}

export default DetailInfo;
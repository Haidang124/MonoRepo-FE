import React from "react";
import Select from "react-select";
import {GenderOptions} from "../../../../auth/models/UserModel";
import Switch from "react-switch";

const Academic: React.FC = () => {
    return (
        <div className='academic'>
            <h3>HỌC LỰC TẠI TRƯỜNG</h3>
            <div className='row align-items-center mb-5'>
                <div className='col-lg align-items-center'>
                    <div className='form-label'>Xếp loại học lực</div>
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
                <div className='col-lg-7 align-items-center'>
                    <div className='form-label'>Điểm môn học tại trường</div>
                    <input
                        type='text'
                        className='form-control'
                        placeholder=''
                    />
                </div>
            </div>
            <div className='row align-items-center mb-5'>
                <div className='col align-items-center'>
                    <div className='form-label'>Thích môn học?</div>
                    <Switch onChange={() => {
                    }} checked={false} checkedIcon={false} onColor={"#3b84e3"} uncheckedIcon={false}/>
                </div>
                <div className='col-lg-7 align-items-center'>
                    <div className='form-label'>Ghi chú</div>
                    <input
                        type='text'
                        className='form-control'
                        placeholder=''
                    />
                </div>
            </div>
        </div>
    )
}

export default Academic
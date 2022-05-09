import React from "react";
import {KTSVG} from "../../../../../_metronic/helpers";
import Select from "react-select";
import {packageTypes, status} from "../../models/ServicePackageModel";

const StudentFilter: React.FC = () => {
    return (
        <div className='align-items-center d-flex'>
            <Select
                key={'service'}
                className='basic-select'
                isClearable
                placeholder='Trạng thái'
                options={packageTypes}
                // onChange={handleServiceTypeChange}
            />
            <Select
                key={'service'}
                className='basic-select'
                isClearable
                placeholder='Lớp học'
                options={packageTypes}
                // onChange={handleServiceTypeChange}
            />
            <Select
                key={'serviceType'}
                className='basic-select'
                isClearable
                placeholder='Người quản lý'
                options={status}
                // onChange={handleStatusChange}
            />
            <div className='d-flex align-items-center position-relative my-1'>
                <KTSVG
                    path='/media/icons/duotune/general/gen021.svg'
                    className='svg-icon-1 position-absolute ms-6'
                />
                <input
                    type='text'
                    data-kt-user-table-filter='search'
                    className='form-control w-250px ps-14'
                    placeholder='Tìm kiếm'
                    // onChange={handleKeyChange}
                />
            </div>
        </div>
    );
}

export default StudentFilter;
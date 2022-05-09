import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {KTSVG} from '../../../../../../_metronic/helpers'

const CenterListFilter = () => {
  const [status, setStatus] = useState<string | undefined>()
  const [servicePackage, setServicePackage] = useState<string | undefined>()
  const [responsibe, setResponsibe] = useState<string | undefined>()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {}

  const filterData = () => {}

  return (
    <>
      {/* begin::Filter Button */}
      <button
        type='button'
        className='btn btn-light-primary me-3'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
        Lọc
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
        {/* begin::Header */}
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Tùy chọn</div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className='separator border-gray-200'></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          {/* begin::Input group */}
          <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>Trạng thái</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='status'
              data-hide-search='true'
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value=''></option>
              <option value='Tiềm năng'>Tiềm năng</option>
              <option value='Quan tâm'>Quan tâm</option>
              <option value='Trải nghiệm'>Trải nghiệm</option>
              <option value='Đăng kí'>Đăng kí</option>
              <option value='Tải tục'>Tải tục</option>
              <option value='Tạm dừng'>Tạm dừng</option>
              <option value='Kết thúc'>Kết thúc</option>
            </select>
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>Gói dịch vụ</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='two-step'
              data-hide-search='true'
              onChange={(e) => setServicePackage(e.target.value)}
              value={servicePackage}
            >
              <option value=''></option>
              <option value='Miễn phí'>Miễn phí</option>
              <option value='Cơ bản'>Cơ bản</option>
              <option value='Nâng cao'>Nâng cao</option>
              <option value='Toàn diện'>Toàn diện</option>
            </select>
          </div>
          <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>Phụ trách</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='two-step'
              data-hide-search='true'
              onChange={(e) => setResponsibe(e.target.value)}
              value={responsibe}
            >
              <option value=''></option>
              <option value='Phụ trách'>Phụ trách</option>
            </select>
          </div>
          {/* end::Input group */}

          {/* begin::Actions */}
          <div className='d-flex justify-content-end'>
            <button
              type='button'
              onClick={filterData}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='reset'
            >
              Reset
            </button>
            <button
              type='button'
              onClick={resetData}
              className='btn btn-primary fw-bold px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              Apply
            </button>
          </div>
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  )
}

export {CenterListFilter}

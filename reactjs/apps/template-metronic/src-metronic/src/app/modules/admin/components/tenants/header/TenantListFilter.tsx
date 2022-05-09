import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {getServiceStates} from '../../../redux/MasterDataCRUD'
interface ITenantContext {
  filterData: (serviceStatesId?: string) => void
}
const TenantListFilter: React.FC<ITenantContext> = ({filterData}) => {
  const [status, setStatus] = useState<string | undefined>()
  const [serviceStates, setServiceStates] = useState([])
  useEffect(() => {
    getServiceStates().then((res) => {
      setServiceStates(res.data.data)
      setStatus(res.data.data[0].id)
    })
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    setStatus('')
  }

  // const filterData = () => {
  //   filterTenant(keyWord, status).then((res) => {})
  // }

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
              {serviceStates.map((state: any) => (
                <option value={state?.id}>{state?.name}</option>
              ))}
            </select>
          </div>
          {/* begin::Actions */}
          <div className='d-flex justify-content-end'>
            <button
              type='button'
              onClick={resetData}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='reset'
            >
              Reset
            </button>
            <button
              type='button'
              onClick={() => filterData(status)}
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

export {TenantListFilter}

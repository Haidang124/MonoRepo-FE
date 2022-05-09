import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {filterTenant} from '../../../redux/TenantCRUD'
import {useTenantContext} from '../TenantContext'
import {TenantListFilter} from './TenantListFilter'

const TenantListHeader = () => {
  const navigate = useNavigate()
  const [keyWord, setKeyWord] = useState<string | undefined>('')
  const tenantContex = useTenantContext()
  const filterData = (serviceStatesId?: string) => {
    filterTenant(keyWord, serviceStatesId).then((res) => {
      tenantContex?.setTenants(res.data.data)
    })
  }
  useEffect(() => {
    filterData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyWord])
  return (
    <div className='d-flex align-items-center justify-content-between mx-6 pt-6'>
      <div className='d-flex align-items-center position-relative my-1'>
        <KTSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-6'
        />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid w-250px ps-14'
          placeholder='Tìm kiếm chi nhánh'
          onChange={(e) => {
            setKeyWord(e.target.value)
          }}
        />
      </div>
      <div className='d-flex justify-content-end'>
        <TenantListFilter filterData={(serviceStatesId?: string) => filterData(serviceStatesId)} />
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => {
            navigate(`/admin/tenantForm`, {state: {isCreate: true, data: {}}})
          }}
        >
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Thêm mới
        </button>
      </div>
    </div>
  )
}

export default TenantListHeader

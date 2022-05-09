import {Column} from 'react-table'
import {Tenant} from '../../../../models/TenantModel'
import TenantActionsCell from './TenantActionsCell'
import {TenantCustomHeader} from './TenantCustomHeader'
const tenantColumns: ReadonlyArray<Column<Tenant>> = [
  {
    Header: (props) => <TenantCustomHeader tableProps={props} title='STT' />,
    id: 'id',
    Cell: ({...props}) => {
      return <>{props.row.index + 1}</>
    },
  },
  {
    Header: (props) => (
      <TenantCustomHeader tableProps={props} title='Chi nhánh' className='min-w-125px' />
    ),
    accessor: 'name',
  },
  {
    Header: (props) => (
      <TenantCustomHeader tableProps={props} title='Điện thoại' className='min-w-125px' />
    ),
    accessor: 'phoneNumber',
  },
  {
    Header: (props) => (
      <TenantCustomHeader tableProps={props} title='Email' className='min-w-125px' />
    ),
    accessor: 'email',
  },
  {
    Header: (props) => (
      <TenantCustomHeader tableProps={props} title='Trạng thái' className='min-w-125px' />
    ),
    id: 'status',
    Cell: ({...props}) => {
      return <>{props.data[props.row.index].tenantInfo.serviceState.name}</>
    },
  },
  {
    Header: (props) => (
      <TenantCustomHeader tableProps={props} title='Người quản lý' className='min-w-125px' />
    ),
    id: 'managerPeople',
    Cell: ({...props}) => {
      return <>{props.data[props.row.index].tenantInfo.managerPosition.name}</>
    },
  },
  {
    Header: (props) => (
      <TenantCustomHeader tableProps={props} title='Tác vụ' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <TenantActionsCell index={props.row.index} />,
  },
]

export {tenantColumns}

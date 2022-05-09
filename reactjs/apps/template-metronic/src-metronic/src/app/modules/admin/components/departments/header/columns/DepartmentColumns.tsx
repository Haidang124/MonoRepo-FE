import {Column} from 'react-table'
import {DepartmentModel} from '../../../../models/DepartmentModel'
import DepartmentActionsCell from './DepartmentActionsCell'
import {DepartmentCustomHeader} from './DepartmentCustomHeader'
const departmentColumns: ReadonlyArray<Column<DepartmentModel>> = [
  {
    Header: (props) => <DepartmentCustomHeader tableProps={props} title='STT' />,
    id: 'id',
    Cell: ({...props}) => {
      return <>{props.row.index + 1}</>
    },
  },
  {
    Header: (props) => (
      <DepartmentCustomHeader tableProps={props} title='Phòng ban' className='min-w-125px' />
    ),
    accessor: 'name',
  },
  {
    Header: (props) => (
      <DepartmentCustomHeader tableProps={props} title='Trạng thái' className='min-w-125px' />
    ),
    id: 'status',
    Cell: ({...props}) => {
      return <>{props.data[props.row.index].info.serviceState.name}</>
    },
  },
  {
    Header: (props) => (
      <DepartmentCustomHeader tableProps={props} title='Chi nhánh' className='min-w-125px' />
    ),
    id: 'tenant',
    Cell: ({...props}) => {
      return <>{props.data[props.row.index].isTenant ? 'Có' : 'Không'}</>
    },
  },
  {
    Header: (props) => (
      <DepartmentCustomHeader tableProps={props} title='Người quản lý' className='min-w-125px' />
    ),
    id: 'managerPeople',
    Cell: ({...props}) => {
      return <>{props.data[props.row.index].info.createdBy?.username}</>
    },
  },
  {
    Header: (props) => (
      <DepartmentCustomHeader
        tableProps={props}
        title='Phòng ban cấp trên'
        className='min-w-125px'
      />
    ),
    id: 'TenantParent',
  },
  {
    Header: (props) => (
      <DepartmentCustomHeader tableProps={props} title='Tác vụ' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <DepartmentActionsCell index={props.row.index} />,
  },
]

export {departmentColumns}

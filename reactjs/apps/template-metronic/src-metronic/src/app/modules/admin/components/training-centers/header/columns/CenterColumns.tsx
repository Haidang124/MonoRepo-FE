import {Column} from 'react-table'
import {Center} from '../../../../models/TrainingCenterModel'
import CenterActionsCell from './CenterActionsCell'
import {CenterCustomHeader} from './CenterCustomHeader'
const centerColumns: ReadonlyArray<Column<Center>> = [
  {
    Header: (props) => <CenterCustomHeader tableProps={props} title='STT' />,
    id: 'id',
    Cell: ({...props}) => {
      return <>{props.row.index + 1}</>
    },
  },
  {
    Header: (props) => (
      <CenterCustomHeader tableProps={props} title='Tên trung tâm' className='min-w-125px' />
    ),
    accessor: 'name',
  },
  {
    Header: (props) => (
      <CenterCustomHeader tableProps={props} title='Người đại diện' className='min-w-125px' />
    ),
    id: 'representative',
    Cell: ({...props}) => {
      return <>{props.data[props.row.index].name}</>
    },
  },
  {
    Header: (props) => (
      <CenterCustomHeader tableProps={props} title='Điện thoại' className='min-w-125px' />
    ),
    accessor: 'phoneNumber',
  },
  {
    Header: (props) => (
      <CenterCustomHeader tableProps={props} title='Trạng thái' className='min-w-125px' />
    ),
    id: 'centerType',
    Cell: ({...props}) => {
      return <>{props.data[props.row.index].centerType.name}</>
    },
  },
  {
    Header: (props) => (
      <CenterCustomHeader tableProps={props} title='Gói dịch vụ' className='min-w-125px' />
    ),
    id: 'servicePackage',
    Cell: ({...props}) => {
      return <>{props.data[props.row.index].serviceInfo.servicePackage.name}</>
    },
  },
  {
    Header: (props) => (
      <CenterCustomHeader tableProps={props} title='Phụ trách' className='min-w-125px' />
    ),
    id: 'user',
    Cell: ({...props}) => {
      return <>{props.data[props.row.index].user.username}</>
    },
  },
  {
    Header: (props) => (
      <CenterCustomHeader tableProps={props} title='Tác vụ' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <CenterActionsCell index={props.row.index} />,
  },
]

export {centerColumns}

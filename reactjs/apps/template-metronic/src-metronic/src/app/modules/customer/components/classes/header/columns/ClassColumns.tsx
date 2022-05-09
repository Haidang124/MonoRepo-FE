import moment from 'moment'
import { Column } from 'react-table'
import { ClassModel, ClassStatus } from '../../../../models/ClassModel'
import ClassActionsCell from './ClassActionsCell'
import { ClassCustomHeader } from './ClassCustomHeader'
// const formatSchedule = (props: any) => {
//   if (props) {
//     const {startTime, dayOfWeek} = props
//     const start = moment(startTime).format('HH:mm')
//     const labelDayOfWeek = DayOfWeek.find((value) => value === dayOfWeek)?.label
//     return `${start} - ${labelDayOfWeek}`
//   }
//   return
// }
const formatDate = (date: any) => {
  return moment(date).format('DD/MM/YYYY')
}
const classColumns: ReadonlyArray<Column<ClassModel>> = [
  {
    Header: (props) => <ClassCustomHeader tableProps={props} title='STT' />,
    id: 'id',
    Cell: ({...props}) => {
      return <>{props.row.index + 1}</>
    },
  },
  {
    Header: (props) => (
      <ClassCustomHeader tableProps={props} title='Tên lớp' className='min-w-125px' />
    ),
    accessor: 'className',
  },
  {
    Header: (props) => (
      <ClassCustomHeader tableProps={props} title='Số buổi' className='min-w-75px' />
    ),
    accessor: 'numberOfLessons',
  },
  {
    Header: (props) => (
      <ClassCustomHeader tableProps={props} title='Bắt đầu' className='min-w-100px' />
    ),
    id: 'startDate',
    Cell: ({...props}) => {
      return <>{formatDate(props.data[props.row.index].startDate)}</>
    },
  },
  {
    Header: (props) => (
      <ClassCustomHeader tableProps={props} title='Kết thúc' className='min-w-100px' />
    ),
    id: 'endDate',
    Cell: ({...props}) => {
      return <>{formatDate(props.data[props.row.index].endDate)}</>
    },
  },
  {
    Header: (props) => (
      <ClassCustomHeader tableProps={props} title='Trạng thái' className='min-w-125px' />
    ),
    id: 'classStatus',
    Cell: ({...props}) => {
      return (
        <>
          {ClassStatus.find((ele) => ele.value === props.data[props.row.index]?.classStatus)?.label}
        </>
      )
    },
  },
  {
    Header: (props) => (
      <ClassCustomHeader tableProps={props} title='Giáo viên' className='min-w-125px' />
    ),
    id: 'teacher',
    Cell: ({...props}) => {
      return (
        <>{props.data[props.row.index].classSchedules[0]?.teachers[0]?.employee?.user?.username}</>
      )
    },
  },
  {
    Header: (props) => (
      <ClassCustomHeader tableProps={props} title='Quản lý' className='min-w-125px' />
    ),
    id: 'manager',
    Cell: ({...props}) => {
      return <>{props.data[props.row.index].managers[0]?.employee?.user?.username}</>
    },
  },
  {
    Header: (props) => <ClassCustomHeader tableProps={props} title='Học viên' />,
    id: 'numberOfStudents',
    Cell: ({...props}) => {
      return <>{10}</>
    },
  },
  {
    Header: (props) => (
      <ClassCustomHeader tableProps={props} title='Tác vụ' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ClassActionsCell index={props.row.index} />,
  },
]

export { classColumns }


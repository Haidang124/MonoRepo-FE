import {Column} from 'react-table'
import {SalaryGradeModel} from '../../../../models/SalaryModel'
import SalaryGradeActionsCell from './SalaryGradeActionsCell'
import {SalaryGradeCustomHeader} from './SalaryGradeCustomHeader'
import SalaryGradeInfo from './SalaryGradeInfo'
const salaryGradesColumns: ReadonlyArray<Column<SalaryGradeModel>> = [
  {
    Header: (props) => (
      <SalaryGradeCustomHeader tableProps={props} title='STT' className='border-0' />
    ),
    id: 'id',
    Cell: ({...props}) => {
      return <div>{props.row.index + 1}</div>
    },
  },
  {
    Header: (props) => (
      <SalaryGradeCustomHeader
        tableProps={props}
        title='Vị trí việc làm'
        className='min-w-150px border-0'
      />
    ),
    id: 'positionName',
    Cell: ({...props}) => {
      return (
        <div className='d-flex flex-column align-items-start justify-content-center mx-3'>
          <div>{props.data[props.row.index].position.name}</div>
          <div>Mức lương cơ bản</div>
          <div>Phụ cấp trách nhiệm</div>
          <div>Phụ cấp khác</div>
          <div>Tổng</div>
        </div>
      )
    },
  },
  {
    Header: (props) => (
      <SalaryGradeCustomHeader
        tableProps={props}
        title='Tỷ lệ phụ cấp'
        className='min-w-25px border-0'
      />
    ),
    id: 'status',
    Cell: ({...props}) => {
      return (
        <div className='d-flex flex-column align-items-start justify-content-start mx-3'>
          <div>0</div>
          <div>0</div>
          <div>{props.data[props.row.index].dutyAllowanceRate}</div>
          <div>{props.data[props.row.index].otherAllowanceRate}</div>
          <div>0</div>
        </div>
      )
    },
  },
  {
    Header: (props) => (
      <SalaryGradeCustomHeader
        tableProps={props}
        title='Bậc lương'
        className='w-100 min-w-300px border-0'
      />
    ),
    id: 'tenant',
    Cell: ({...props}) => {
      return <>{props.data[props.row.index].salaryGrades.salaryGradeRate}</>
    },
    columns: [
      {
        Header: 'I',
        id: 'I',
        Cell: ({...props}) => {
          return <SalaryGradeInfo data={props.data[props.row.index]} index={0} />
        },
      },
      {
        Header: 'II',
        id: 'II',
        Cell: ({...props}) => {
          return <SalaryGradeInfo data={props.data[props.row.index]} index={1} />
        },
      },
      {
        Header: 'III',
        id: 'III',
        Cell: ({...props}) => {
          return <SalaryGradeInfo data={props.data[props.row.index]} index={2} />
        },
      },
      {
        Header: 'IV',
        id: 'IV',
        Cell: ({...props}) => {
          return <SalaryGradeInfo data={props.data[props.row.index]} index={3} />
        },
      },
      {
        Header: 'V',
        id: 'V',
        Cell: ({...props}) => {
          return <SalaryGradeInfo data={props.data[props.row.index]} index={4} />
        },
      },
    ],
  },
  {
    Header: (props) => (
      <SalaryGradeCustomHeader tableProps={props} title='Tác vụ' className='min-w-25px border-0' />
    ),
    id: 'actions',
    Cell: ({...props}) => <SalaryGradeActionsCell index={props.row.index} />,
  },
]

export {salaryGradesColumns}

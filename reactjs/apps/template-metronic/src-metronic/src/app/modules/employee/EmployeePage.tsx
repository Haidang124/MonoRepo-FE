import {Navigate, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import Employee from './components/Employee'
import EmployeeForm from './components/EmployeeForm'

const personnelBreadCrumbs: Array<PageLink> = [
  {
    title: 'Nhân sự',
    path: '/personnel/employee',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const EmployeePage = () => (
  <Routes>
    <Route>
      <Route
        path='employee'
        element={
          <>
            <PageTitle breadcrumbs={personnelBreadCrumbs}>Nhân viên</PageTitle>
            <Employee />
          </>
        }
      />
      <Route
        path='employeeForm'
        element={
          <>
            <PageTitle breadcrumbs={personnelBreadCrumbs}>Thông tin</PageTitle>
            <EmployeeForm />
          </>
        }
      />
      <Route index element={<Navigate to='/personnel/employee' />} />
    </Route>
  </Routes>
)

export default EmployeePage

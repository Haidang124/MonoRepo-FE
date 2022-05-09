import React from 'react'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import ClassroomPage from './components/classrooms/Classroom'
import ClassroomForm from './components/classrooms/ClassroomForm'
import CoursePage from './components/courses/Course'
import CourseForm from './components/courses/CourseForm'
import DepartmentPage from './components/departments/Department'
import DepartmentForm from './components/departments/DepartmentForm'
import FunctionPage from './components/functions/Functions'
import Position from './components/positions/Position'
import PositionDetail from './components/positions/PositionDetail'
import RolePage from './components/roles/Roles'
import SalaryForm from './components/salarys/SalaryForm'
import SalaryGradeForm from './components/salarys/SalaryGradeForm'
import SalaryGradePage from './components/salarys/SalaryGrade'
import ServiceDetailUnit from './components/service-packages/service-detail/ServiceDetail'
import ServicePackageView from './components/service-packages/ServicePackage'
import ServiceUnit from './components/service-unit/ServiceUnit'
import StudentView from './components/student/Student'
import StudentForm from './components/student/studentForm/StudentForm'
import SubjectView from './components/subjects/Subject'
import SubjectForm from './components/subjects/SubjectForm'
import TenantPage from './components/tenants/Tenant'
import TenantForm from './components/tenants/TenantForm'
import CenterPage from './components/training-centers/Center'
import CenterForm from './components/training-centers/CenterForm'
import ExaminationPage from "./components/examination/Examination";
import ExaminationForm from "./components/examination/ExaminationForm";
import ExaminationMark from "./components/examination/ExaminationMark";
import MoneyProvider from "./components/money/MoneyContext";
import MoneyForm from "./components/money/MoneyForm";
import MoneyPage from "./components/money/Money";


const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Admin',
    path: '/admin',
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

const AdminPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='functions'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Functions</PageTitle>
              <FunctionPage />
            </>
          }
        />
        <Route
          path='serviceUnit'
          element={
            <>
              <ServiceUnit />
            </>
          }
        />
        <Route
          path='serviceDetail'
          element={
            <>
              <ServiceDetailUnit />
            </>
          }
        />
        <Route
          path='servicePackage'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Service Package</PageTitle>
              <ServicePackageView />
            </>
          }
        />
        <Route
          path='roles'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Roles</PageTitle>
              <RolePage />
            </>
          }
        />
        <Route
          path='subject'
          element={
            <>
              <SubjectView />
            </>
          }
        />
        <Route
          path='subjectDetail'
          element={
            <>
              <SubjectForm />
            </>
          }
        />
        <Route
          path='student'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Student</PageTitle>
              <StudentView />
            </>
          }
        />
        <Route
          path='studentDetail'
          element={
            <>
              <StudentForm />
            </>
          }
        />
        <Route
          path='center'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Center</PageTitle>
              <CenterPage />
            </>
          }
        />
        <Route
          path='centerForm'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Center Form</PageTitle>
              <CenterForm />
            </>
          }
        />
        <Route
          path='tenant'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Tenant</PageTitle>
              <TenantPage />
            </>
          }
        />
        <Route
          path='tenantForm'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Tenant Form</PageTitle>
              <TenantForm />
            </>
          }
        />
        <Route
          path='department'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Department</PageTitle>
              <DepartmentPage />
            </>
          }
        />
        <Route
          path='departmentForm'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Department Form</PageTitle>
              <DepartmentForm />
            </>
          }
        />
        <Route
          path='salaryGrade'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Salary Grade</PageTitle>
              <SalaryGradePage />
            </>
          }
        />
        <Route
          path='salaryForm'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Salary Form</PageTitle>
              <SalaryForm />
            </>
          }
        />
        <Route
          path='salaryGradeForm'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Salary Form</PageTitle>
              <SalaryGradeForm />
            </>
          }
        />
        <Route
          path='classroom'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Classroom</PageTitle>
              <ClassroomPage />
            </>
          }
        />
        <Route
          path='classroomForm'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Classroom Form</PageTitle>
              <ClassroomForm />
            </>
          }
        />
        <Route
          path='course'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Course</PageTitle>
              <CoursePage />
            </>
          }
        />
        <Route
          path='courseForm'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Course Form</PageTitle>
              <CourseForm />
            </>
          }
        />
        <Route
          path='position'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Position</PageTitle>
              <Position />
            </>
          }
        />
        <Route
          path='positionDetail'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Position Form</PageTitle>
              <PositionDetail />
            </>
          }
        />
        <Route
          path='examination'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Examination</PageTitle>
              <ExaminationPage />
            </>
          }
        />
        <Route
          path='examinationForm'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Examination Form</PageTitle>
              <ExaminationForm />
            </>
          }
        />
        <Route
          path='examinationMark'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Examination Mark</PageTitle>
              <ExaminationMark />
            </>
          }
        />
        <Route
          path='money'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Money</PageTitle>
              <MoneyPage />
            </>
          }
        />
        <Route
          path='money/moneyForm'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Money Form</PageTitle>
              <MoneyProvider>
                <MoneyForm />
              </MoneyProvider>
            </>
          }
        />
        <Route index element={<Navigate to='/admin/functions' />} />
      </Route>
    </Routes>
  )
}

export default AdminPage

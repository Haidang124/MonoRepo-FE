import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import ClassPage from './components/classes/Class'
import ClassDetail from './components/classes/ClassDetail'
import ClassDetailForm from './components/classes/ClassDetailForm'
import ClassForm from './components/classes/ClassForm'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Customer',
    path: '/customer',
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

const CustomerPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='class'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Class</PageTitle>
              <ClassPage />
            </>
          }
        />
        <Route
          path='classForm'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Class</PageTitle>
              <ClassForm />
            </>
          }
        />
        <Route
          path='classDetail'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Class</PageTitle>
              <ClassDetail />
            </>
          }
        />
        <Route
          path='classDetailForm'
          element={
            <>
              <PageTitle breadcrumbs={widgetsBreadCrumbs}>Class</PageTitle>
              <ClassDetailForm />
            </>
          }
        />
        <Route index element={<Navigate to='/customer/class' />} />
      </Route>
    </Routes>
  )
}

export default CustomerPage

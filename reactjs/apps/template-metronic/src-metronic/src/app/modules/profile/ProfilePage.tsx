import {Navigate, Routes, Route} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Overview} from './components/Overview'


const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/profile/overview',
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

const ProfilePage = () => (
  <Routes>
    <Route>
      <Route
        path='overview'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Overview</PageTitle>
            <Overview />
          </>
        }
      />
      {/*<Route*/}
      {/*  path='projects'*/}
      {/*  element={*/}
      {/*    <>*/}
      {/*      <PageTitle breadcrumbs={profileBreadCrumbs}>Projects</PageTitle>*/}
      {/*      <Projects />*/}
      {/*    </>*/}
      {/*  }*/}
      {/*/>*/}
      {/*<Route*/}
      {/*  path='campaigns'*/}
      {/*  element={*/}
      {/*    <>*/}
      {/*      <PageTitle breadcrumbs={profileBreadCrumbs}>Campaigns</PageTitle>*/}
      {/*      <Campaigns />*/}
      {/*    </>*/}
      {/*  }*/}
      {/*/>*/}
      {/*<Route*/}
      {/*  path='documents'*/}
      {/*  element={*/}
      {/*    <>*/}
      {/*      <PageTitle breadcrumbs={profileBreadCrumbs}>Documents</PageTitle>*/}
      {/*      <Documents />*/}
      {/*    </>*/}
      {/*  }*/}
      {/*/>*/}
      {/*<Route*/}
      {/*  path='connections'*/}
      {/*  element={*/}
      {/*    <>*/}
      {/*      <PageTitle breadcrumbs={profileBreadCrumbs}>Connections</PageTitle>*/}
      {/*      <Connections />*/}
      {/*    </>*/}
      {/*  }*/}
      {/*/>*/}
      <Route index element={<Navigate to='/profile/overview' />} />
    </Route>
  </Routes>
)

export default ProfilePage

/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {AsideMenuItem} from './AsideMenuItem'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />

      {
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Admin</span>
            </div>
          </div>
          <AsideMenuItem
            to='/admin/functions'
            title={intl.formatMessage({id: 'MENU.FUNCTIONS'})}
            fontIcon='fas fa-envelope-open-tex'
            icon='/media/icons/duotune/general/gen022.svg'
          />
          <AsideMenuItem
            to='/admin/roles'
            title={intl.formatMessage({id: 'MENU.ROLES'})}
            fontIcon='bi-app-indicator'
            icon='/media/icons/duotune/general/gen022.svg'
          />
          <AsideMenuItem
            to='/admin/servicePackage'
            title={intl.formatMessage({id: 'MENU.SERVICE_PACKAGES'})}
            fontIcon='bi-app-indicator'
            icon='/media/icons/duotune/general/gen022.svg'
          />
          <AsideMenuItem
            to='/admin/position'
            title={intl.formatMessage({id: 'MENU.POSITIONS'})}
            fontIcon='bi-app-indicator'
            icon='/media/icons/duotune/general/gen022.svg'
          />
          <AsideMenuItem
            to='/admin/center'
            title={intl.formatMessage({id: 'MENU.CENTERS'})}
            fontIcon='bi-app-indicator'
            icon='/media/icons/duotune/general/gen022.svg'
          />
          <AsideMenuItem
            to='/admin/department'
            title={intl.formatMessage({id: 'MENU.DEPARTMENTS'})}
            fontIcon='bi-app-indicator'
            icon='/media/icons/duotune/general/gen022.svg'
          />
          <AsideMenuItem
            to='/admin/salaryGrade'
            title={intl.formatMessage({id: 'MENU.SALARYGRADES'})}
            fontIcon='bi-app-indicator'
            icon='/media/icons/duotune/general/gen022.svg'
          />
          <AsideMenuItem
            to='/admin/tenant'
            title={intl.formatMessage({id: 'MENU.TENANTS'})}
            fontIcon='bi-app-indicator'
            icon='/media/icons/duotune/general/gen022.svg'
          />
          <AsideMenuItem
            to={'/admin/classroom'}
            title={intl.formatMessage({id: 'MENU.CLASSROOMS'})}
            fontIcon='bi-app-indicator'
            icon='/media/icons/duotune/general/gen022.svg'
          />
          <AsideMenuItem
            to={'/admin/course'}
            title={intl.formatMessage({id: 'MENU.COURSES'})}
            fontIcon='bi-app-indicator'
            icon='/media/icons/duotune/general/gen022.svg'
          />
          <AsideMenuItem
            to={'/admin/examination'}
            title={intl.formatMessage({id: 'MENU.EXAMINATIONS'})}
            fontIcon='bi-app-indicator'
            icon='/media/icons/duotune/general/gen022.svg'
          />
          <AsideMenuItem
            to={'/admin/money'}
            title={intl.formatMessage({id: 'MENU.MONEY'})}
            fontIcon='bi-app-indicator'
            icon='/media/icons/duotune/general/gen022.svg'
          />
        </>
      }
      {
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Nhân sự</span>
            </div>
          </div>
          <AsideMenuItemWithSub
            to='/personnel'
            title='Nhân sự'
            fontIcon='bi-archive'
            icon='/media/icons/duotune/general/gen022.svg'
          >
            <AsideMenuItem to='/personnel/employee' title='Nhân viên' hasBullet={true} />
          </AsideMenuItemWithSub>
        </>
      }
      {
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Khách Hàng</span>
            </div>
          </div>
          <AsideMenuItem
            to='/customer'
            title={intl.formatMessage({id: 'MENU.CLASSES'})}
            fontIcon='bi-archive'
            icon='/media/icons/duotune/general/gen022.svg'
          ></AsideMenuItem>
        </>
      }
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div>

      <AsideMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
          <AsideMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItem
        to='/settings'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Settings'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/apps/user-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='User management'
        fontIcon='bi-layers'
      />
      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4' />
        </div>
      </div>
    </>
  )
}

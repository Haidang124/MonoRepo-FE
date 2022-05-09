import type {Dispatch, SetStateAction} from 'react'
import React, {createContext, useContext, useEffect, useState} from 'react'
import {ModalData, RoleModel} from '../../models/RoleModel'
import {getAllRoles} from '../../redux/RoleCRUD'

export interface RoleContextProps {
  roles: RoleModel[]
  setRoles: Dispatch<SetStateAction<RoleModel[]>>
  role: RoleModel
  setRole: (node: RoleModel) => void
  modal: ModalData
  setModal: Dispatch<SetStateAction<ModalData>>
}

const RoleContext = createContext<RoleContextProps>({} as RoleContextProps)

export const useRoleContext = () => useContext<RoleContextProps>(RoleContext)

const RoleProvider: React.FC = ({children}) => {
  const [roles, setRoles] = useState<RoleModel[]>()
  const [role, setRole] = useState<RoleModel>()
  const [modal, setModal] = useState<ModalData>({
    show: false,
    data: '',
    title: '',
    onSubmit: () => {},
  })

  useEffect(() => {
    getAllRoles().then((res) => {
      setRoles(res.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    roles,
    setRoles,
    role,
    setRole,
    modal,
    setModal,
  } as RoleContextProps

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export default RoleProvider

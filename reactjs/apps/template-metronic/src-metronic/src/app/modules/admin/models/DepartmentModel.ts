export interface DepartmentModel {
  id?: string
  name: string
  isTenant: boolean
  isRoot: boolean
  parentId: string
  description: string
  info: {
    serviceStateId: string
  }
}

export interface Tenant {
  name: string
  provinceId: string
  phoneNumber: string
  email: string
  address: string
  tenantInfos: {
    managerId: string
    serviceStateId: string
    managerPositionId: string
  }
}

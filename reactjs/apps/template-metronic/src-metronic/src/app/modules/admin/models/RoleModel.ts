export interface RoleModel {
  id: string;
  name: string;
  children: RoleModel[];
  functionIds: string[];
}

export interface FunctionRoleData {
  functionId: string;
  roleId: string;
  active: boolean;
}

export interface ModalData {
  data: any;
  show: boolean;
  title: string;
  onSubmit: (data: any) => void;
}



export interface MoneyModel {
  id?: string
  name: string
  type?: MoneyType
  category?: MoneyCategory
  template?: MoneyTemplate
  price?: number
  unit?: string
  description?: string
  incomes?: IncomeModel[]
  expenses?: ExpenseModel[]
}

export interface IncomeModel {
  id?: string
  name?: string
  moneyId?: string
  description?: string
}
export interface ExpenseModel {
  id?: string
  name?: string
  moneyId?: string
  description?: string
}
export enum MoneyType {
  Income,
  Expense,
}
export const MoneyTypeOption = [
  {label: 'Khoản thu', value: MoneyType.Income},
  {label: 'Khoản chi', value: MoneyType.Expense},
]

enum MoneyCategory {
  Tuition,
  Foreign,
  Training,
  StudyTool,
}
export const MoneyCategoryOption = [
  {label: 'Học phí', value: MoneyCategory.Tuition},
  {label: 'Ngoại khóa', value: MoneyCategory.Foreign},
  {label: 'Giáo trình', value: MoneyCategory.Training},
  {label: 'Dụng cụ học tập', value: MoneyCategory.StudyTool},
]
enum MoneyTemplate {
  Tuition,
  Other,
}

export const MoneyTemplateOption = [
  {label: 'Phiếu thu học phí', value: MoneyTemplate.Tuition},
  {label: 'Phiếu thu khác', value: MoneyTemplate.Other},
]

export interface MoneyModal {
  data: any;
  show: boolean;
  title: string;
  type: MoneyType;
  onSubmit: (data: any) => void;
}

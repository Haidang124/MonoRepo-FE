import { UserModel } from "../../auth/models/UserModel"

export interface Education {
  employeeId: string
  degree: number
  level: number
  major: string
}
export interface WorkingInfo {
  status: number
  tenantId: string
  workType: number
  employeeId: string
}
export interface CertificateEmployee {
  certificate: number
  certificateLevel: number
  score: number
  employeeId: string
}
export interface DateOff {
  dayOfWeek: number
  halfDay: boolean
  employeeId: string
}
export interface PositionEmployee {
  positionId: string
  employeeId: string
  salaryLevel: number
  insurance: boolean
}
export interface WorkingContract {
  startTime: string
  endTime: string
  employeeId: string
}
export interface Employee {
  id: string
  parentId: string
  username: string
  password: string
  fullName: string
  idNumber: string
  gender: number
  dob: string
  maritalStatus: number
  phoneNumber: string
  email: string
  address: string
  relativeName: string
  relativePhoneNumber: string
  relationId? : number 
  relativeEmail: string
  relativeAddress: string
  relation: number
  academicLevelId: string
  graduationTypeId: string
  major: string
  certificateName: string
  certificateLevelId: string
  bankAccount: string
  bankNumber: string
  bankName: string
  bankBranch: string
  user? : UserModel
  educations?: Education[]
  workingInfos?: WorkingInfo[]
  workingContracts?: WorkingContract[]
  positionEmployees?: PositionEmployee[]
  dateOffs?: DateOff[]
  certificateEmployees?: CertificateEmployee[]
  userId? : string
}

enum Degree {
  //tiến sĩ
  Master,
  //Thạc sĩ
  Bachelor,
  // Đại học
  College,
  //Cao đẳng
  HighSchool,
  //Trung cấp
  MiddleSchool,
  //Phổ thông
  ElementtarySchool,
}

export const DegreeEducationOptions = [
  {value: Degree.Master, label: 'Tiến sĩ'},
  {value: Degree.Bachelor, label: 'Thạc sĩ'},
  {value: Degree.College, label: 'Đai học'},
  {value: Degree.HighSchool, label: 'Cao đẳng'},
  {value: Degree.MiddleSchool, label: 'Trung cấp'},
  {value: Degree.ElementtarySchool, label: 'Phổ thông'},
]

enum Level {
  //Xuất sắc
  Excellent,
  //Giỏi
  Good,
  //Khá
  Average,
  //Trung bình-khá
  Pass,
  //Trung bình
  Fail,
}

export const LevelEducationsOptions = [
  {value: Level.Excellent, label: 'Xuất sắc'},
  {value: Level.Good, label: 'Giỏi'},
  {value: Level.Average, label: 'Khá'},
  {value: Level.Pass, label: 'Trung binh - khá'},
  {value: Level.Fail, label: 'Trung bình'},
]

enum Certificate {
  IELTS,
  TOEIC,
  TOEFL,
}

export const CertificateOptions = [
  {value: Certificate.IELTS, label: 'IELTS'},
  {value: Certificate.TOEIC, label: 'TOEIC'},
  {value: Certificate.TOEFL, label: 'TOEFL'},
]

export const CertificateLevelOptions = [
  {value: 0, label: 'Xuất sắc'},
  {value: 1, label: 'Giỏi'},
  {value: 2, label: 'Khá'},
  {value: 3, label: 'Trung bình'},
]

enum Relation {
  Mother,
  Father,
  Sister,
  Brother,
  Son,
  Daughter,
  Friend,
  Husband,
  Wife,
  Other,
}

export const RelationOptions = [
  {value: Relation.Mother, label: 'Mẹ'},
  {value: Relation.Father, label: 'Bố'},
  {value: Relation.Sister, label: 'Chị/em gái'},
  {value: Relation.Brother, label: 'Anh/em trai'},
  {value: Relation.Son, label: 'Con trai'},
  {value: Relation.Daughter, label: 'Con gái'},
  {value: Relation.Friend, label: 'Bạn'},
  {value: Relation.Husband, label: 'Chồng'},
  {value: Relation.Wife, label: 'Vợ'},
  {value: Relation.Other, label: 'Người khác'},
]

enum Status {
  // Ứng tuyển
  Applied,
  // Thử việc
  Trial,
  // Chính thức
  Regular,
  // Tạm nghỉ
  Suspended,
  // Sa thải
  Resign,
  // Xin nghỉ
  Leave,
  // Gia hạn
  Renew,
}

export const StatusOptions = [
  {value: Status.Applied, label: 'Ứng tuyển'},
  {value: Status.Trial, label: 'Thử việc'},
  {value: Status.Regular, label: 'Chính thức'},
  {value: Status.Suspended, label: 'Tạm nghỉ'},
  {value: Status.Resign, label: 'Sa thải'},
  {value: Status.Leave, label: 'Xin nghỉ'},
  {value: Status.Renew, label: 'Gia hạn'},
]

enum WorkType {
  FullTime,
  PartTime,
}

export const WorkTypeOptions = [
  {value: WorkType.PartTime, label: 'PartTime'},
  {value: WorkType.FullTime, label: 'FullTime'},
]
export const DayofWeek = [
  {value: 0, label: 'Thứ 2'},
  {value: 1, label: 'Thứ 3'},
  {value: 2, label: 'Thứ 4'},
  {value: 3, label: 'Thứ 5'},
  {value: 4, label: 'Thứ 6'},
  {value: 5, label: 'Thứ 7'},
  {value: 6, label: 'Chủ nhật'},
]

enum SalaryLevel {
  // Bậc I
  Level1,

  // Bậc II
  Level2,

  // Bậc III
  Level3,

  // Bậc IV
  Level4,

  // Bậc V
  Level5,
}

export const SalaryLevelOptions = [
  {value : SalaryLevel.Level1, label : 'Bậc 1'},
  {value : SalaryLevel.Level2, label : 'Bậc 2'},
  {value : SalaryLevel.Level3, label : 'Bậc 3'},
  {value : SalaryLevel.Level4, label : 'Bậc 4'},
  {value : SalaryLevel.Level5, label : 'Bậc 5'},
]

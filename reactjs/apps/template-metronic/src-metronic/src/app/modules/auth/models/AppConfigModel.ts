import {UserModel} from "./UserModel";

export interface AppConfigModel {
    user: UserModel
    permissions: string[]
}

import {ApiEndpointModel} from "./ApiEndpointModel";

export interface FunctionDetailModel {
    id: string
    name: string
    type: string
    parentId?: string
    children: FunctionDetailModel[]
    apiEndpoints: ApiEndpointModel[]
}
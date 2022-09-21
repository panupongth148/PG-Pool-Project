import ProjectResponseModel from "./ProjectResponseModel";

export default interface DiifDateModel{
    projectCode: string,
    empNo: string,
    month:number,
    name: string,
    endDate: Date,
    projectInfo: ProjectResponseModel

}
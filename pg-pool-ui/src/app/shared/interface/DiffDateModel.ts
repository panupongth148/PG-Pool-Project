import ProjectResponseModel from "./ProjectResponseModel";

export default interface DiifDateModel{
    projectCode: string,
    empNo: string,
    month:number,
    name: string,
    startDate: Date,
    endDate: Date,
    projectInfo: ProjectResponseModel

}
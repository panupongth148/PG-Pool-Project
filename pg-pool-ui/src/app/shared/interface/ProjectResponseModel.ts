export default interface ProjectResponseModel{
    id: string,
    projectName: string,
    projectCode: string,
    progress: Number,
    requests:[{
        amount : Number,
        positionRequest: string
    }]
    memberAmount:number,
    contractStart: Date
    contractEnd: Date
}
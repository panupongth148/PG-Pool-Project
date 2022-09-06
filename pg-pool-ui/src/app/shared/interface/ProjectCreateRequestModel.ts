export default interface ProjectCreateRequestModel{
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
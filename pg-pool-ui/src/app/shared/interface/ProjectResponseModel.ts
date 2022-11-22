export default interface ProjectResponseModel{
    id: string,
    projectName: string,
    projectCode: string,
    progress: number,
    requests:[{
        amount : number,
        positionRequest: string
    }]
    memberAmount:number,
    contractStart: Date
    contractEnd: Date,
    projectOwner: string
    isHistory: boolean
}
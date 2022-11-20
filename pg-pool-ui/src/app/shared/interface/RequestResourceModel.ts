export default interface RequestResourceModel {
    month: number,
    requestDetail: [{
        projectCode: string,
        projectName: string
        requests: [{ amount: number, positionRequest: string, dateWithin: Date }]
    }]
}
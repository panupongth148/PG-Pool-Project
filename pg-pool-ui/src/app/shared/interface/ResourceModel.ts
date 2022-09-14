export default interface ResourceModel {

    id: string
    empNo: string,
    prefix: string
    firstName: string;
    lastName: string;
    empEmail: string;
    hireDate: Date;
    expireDate: Date;
    position: string;
    tel: string;
    projects: [{
        projectCode: string,
        workingDetail: [{
            projectId: string;
            duration: number;
            assigned: number;
            working: number;
            startDate: Date;
            endDate: Date;

        }]
    }]


}
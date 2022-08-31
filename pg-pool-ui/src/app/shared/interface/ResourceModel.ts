export default interface ResourceModel{
    id: string
    firstName: string;
    lastName: string;
    empEmail: string;
    hireDate: Date;
    expireDate: Date;
    position: string;
    tel: string;
    projects: [
        {
            projectId: string;
            duration: number;
            assigned: number;
            startDate: Date;
            endDate: Date;

        }
    ]


}
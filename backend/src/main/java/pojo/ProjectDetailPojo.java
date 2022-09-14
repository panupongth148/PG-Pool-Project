package pojo;

import java.util.Date;
import java.util.List;

public class ProjectDetailPojo {
    private String projectName;
    private String customerCode;
    private String projectCode;
    private Date contractStart;
    private Date contractEnd;
    private List<SubResourcePojo> resources;
    public String getProjectName() {
        return projectName;
    }
    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
    public String getProjectCode() {
        return projectCode;
    }
    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }
    public Date getContractStart() {
        return contractStart;
    }
    public void setContractStart(Date contractStart) {
        this.contractStart = contractStart;
    }
    public Date getContractEnd() {
        return contractEnd;
    }
    public void setContractEnd(Date contractEnd) {
        this.contractEnd = contractEnd;
    }
    public List<SubResourcePojo> getResources() {
        return resources;
    }
    public void setResources(List<SubResourcePojo> resources) {
        this.resources = resources;
    }
    public String getCustomerCode() {
        return customerCode;
    }
    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }
    
}

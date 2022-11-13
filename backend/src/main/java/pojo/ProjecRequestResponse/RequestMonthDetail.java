package pojo.ProjecRequestResponse;

import java.util.List;

import sub.document.RequestResource;

public class RequestMonthDetail {
    private String projectCode;
    // private RequestResource requestPositionModel;
    private List<RequestResource> requestPositionModel;
    public String getProjectCode() {
        return projectCode;
    }
    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }
    public List<RequestResource> getRequestPositionModel() {
        return requestPositionModel;
    }
    public void setRequestPositionModel(List<RequestResource> requestPositionModel) {
        this.requestPositionModel = requestPositionModel;
    }
    // public RequestResource getRequestPositionModel() {
    //     return requestPositionModel;
    // }
    // public void setRequestPositionModel(RequestResource requestPositionModel) {
    //     this.requestPositionModel = requestPositionModel;
    // }
    

    

    
}

package pojo.ProjecRequestResponse;

import java.util.List;

import project.Project;
import sub.document.RequestResource;

public class RequestMonthDetail {
    private Project project;
    private RequestResource requestPositionModel;
    // private List<RequestResource> requestPositionModel;
    
    
    // public List<RequestResource> getRequestPositionModel() {
    //     return requestPositionModel;
    // }
    // public void setRequestPositionModel(List<RequestResource> requestPositionModel) {
    //     this.requestPositionModel = requestPositionModel;
    // }

    
    public RequestResource getRequestPositionModel() {
        return requestPositionModel;
    }
    public void setRequestPositionModel(RequestResource requestPositionModel) {
        this.requestPositionModel = requestPositionModel;
    }
    public Project getProject() {
        return project;
    }
    public void setProject(Project project) {
        this.project = project;
    }
    

    

    
}

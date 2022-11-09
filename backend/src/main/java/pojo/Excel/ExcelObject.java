package pojo.Excel;

import java.util.List;

import project.Project;
import resource.Resource;

public class ExcelObject {
    private Project project;
    private List<Resource> resourceList;
    public Project getProject() {
        return project;
    }
    public void setProject(Project project) {
        this.project = project;
    }
    public List<Resource> getResourceList() {
        return resourceList;
    }
    public void setResourceList(List<Resource> resourceList) {
        this.resourceList = resourceList;
    }
  

    
    
}

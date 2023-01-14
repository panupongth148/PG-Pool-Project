package pojo;

import java.util.List;

import resource.Resource;

public class ResponseChartDataModel {
    private int month;
    private List<Resource> resources;
    public int getMonth() {
        return month;
    }
    public void setMonth(int month) {
        this.month = month;
    }
    public List<Resource> getResources() {
        return resources;
    }
    public void setResources(List<Resource> resources) {
        this.resources = resources;
    }

    
}

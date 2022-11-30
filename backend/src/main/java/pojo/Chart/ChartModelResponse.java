package pojo.Chart;

import java.util.List;

public class ChartModelResponse {
    private int month;
    private List<ResourceDetailInChart> resources;
    public int getMonth() {
        return month;
    }
    public void setMonth(int month) {
        this.month = month;
    }
    public List<ResourceDetailInChart> getResources() {
        return resources;
    }
    public void setResources(List<ResourceDetailInChart> resources) {
        this.resources = resources;
    }

    
}

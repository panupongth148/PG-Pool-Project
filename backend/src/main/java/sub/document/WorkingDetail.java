package sub.document;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class WorkingDetail {

    private Double duration;
    private Double assigned;

    @BsonProperty(value = "start_date")
    private String startDate;
    private Double working;
    @BsonProperty(value = "end_date")
    private String endDate;
    public Double getDuration() {
        return duration;
    }
    public void setDuration(Double duration) {
        this.duration = duration;
    }
    public Double getAssigned() {
        return assigned;
    }
    public void setAssigned(Double assigned) {
        this.assigned = assigned;
    }
    public String getStartDate() {
        return startDate;
    }
    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }
    public Double getWorking() {
        return working;
    }
    public void setWorking(Double working) {
        this.working = working;
    }
    public String getEndDate() {
        return endDate;
    }
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }


    
}
package sub.document;

import java.util.Date;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class WorkingDetail {

    private Double duration;
    private Double assigned;

    @BsonProperty(value = "start_date")
    private Date startDate;
    private Double working;
    @BsonProperty(value = "end_date")
    private Date endDate;
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
    public Date getStartDate() {
        return startDate;
    }
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
    public Double getWorking() {
        return working;
    }
    public void setWorking(Double working) {
        this.working = working;
    }
    public Date getEndDate() {
        return endDate;
    }
    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }


    
}
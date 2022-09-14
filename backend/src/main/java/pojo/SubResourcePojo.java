package pojo;

import java.util.Date;

public class SubResourcePojo {
    private int empNo;
    private String name;
    private Date startDate;
    private Date endDate;
    private float duration;
    private float working;
    private float assigned;

    public SubResourcePojo(){

    }

    public int getEmpNo() {
        return empNo;
    }

    public void setEmpNo(int empNo) {
        this.empNo = empNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public float getDuration() {
        return duration;
    }

    public void setDuration(float duration) {
        this.duration = duration;
    }

    public float getWorking() {
        return working;
    }

    public void setWorking(float working) {
        this.working = working;
    }

    public float getAssigned() {
        return assigned;
    }

    public void setAssigned(float assigned) {
        this.assigned = assigned;
    }

    
}

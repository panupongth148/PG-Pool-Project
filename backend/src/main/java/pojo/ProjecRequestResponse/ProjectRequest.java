package pojo.ProjecRequestResponse;

import java.util.Date;
import java.util.List;

public class ProjectRequest {
    private int month;
    
   

    private List<RequestMonthDetail> requestMonthDetail;
    public int getMonth() {
        return month;
    }
    public void setMonth(int month) {
        this.month = month;
    }
    public List<RequestMonthDetail> getRequestMonthDetail() {
        return requestMonthDetail;
    }
    public void setRequestMonthDetail(List<RequestMonthDetail> requestMonthDetail) {
        this.requestMonthDetail = requestMonthDetail;
    }
    
    
    
}

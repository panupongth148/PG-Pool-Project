package pojo.ProjecRequestResponse;

import java.util.Date;

public class RequestPositionModel {
    private String position;
    private Date dateWithin;
    private String amount;
    public String getPosition() {
        return position;
    }
    public void setPosition(String position) {
        this.position = position;
    }
    public String getAmount() {
        return amount;
    }
    public void setAmount(String amount) {
        this.amount = amount;
    }

    
}

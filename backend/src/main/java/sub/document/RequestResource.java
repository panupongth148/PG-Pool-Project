package sub.document;

import java.io.Serializable;
import java.util.Date;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class RequestResource implements Serializable{

    @BsonProperty(value = "amount")
    private Integer amount;
    
    @BsonProperty(value = "position_request")
    private String positionRequest;

    @BsonProperty(value = "date_within")
    private DatewithinModel dateWithin;
    
    // @BsonProperty(value = "date_within")
    //  private Date dateWithin;


    public Integer getAmount() {
        return amount;
    }
    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getPositionRequest() {
        return positionRequest;
    }

    public void setPositionRequest(String positionRequest) {
        this.positionRequest = positionRequest;
    }
    public DatewithinModel getDateWithin() {
        return dateWithin;
    }
    public void setDateWithin(DatewithinModel dateWithin) {
        this.dateWithin = dateWithin;
    }
    // public Date getDateWithin() {
    //     return dateWithin;
    // }
    // public void setDateWithin(Date dateWithin) {
    //     this.dateWithin = dateWithin;
    // }


    

    
    
    
    

    
}

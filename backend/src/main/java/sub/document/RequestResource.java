package sub.document;

import java.io.Serializable;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class RequestResource implements Serializable{

    @BsonProperty(value = "amount")
    private Integer amount;
    
    @BsonProperty(value = "position_request")
    private String positionRequest;

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

    

    
}

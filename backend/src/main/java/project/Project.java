package project;

import java.util.Date;
import java.util.List;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;

import io.quarkus.mongodb.panache.common.MongoEntity;
import sub.document.RequestResource;

@MongoEntity(collection = "project")
public class Project {
	
	private ObjectId id;

	@BsonProperty(value = "customer_code")
	 private String customerCode;

	@BsonProperty(value = "project_name")
	 private String projectName;
	 
	@BsonProperty(value = "project_code")
	 private String projectCode;
	

	 @BsonProperty(value = "requests")
	 private List<RequestResource> requests;

	 @BsonProperty(value = "member_amount")
	 private int memberAmount;
	 
	@BsonProperty(value = "progress")
	 private float progress;
	 
	@BsonProperty(value = "contract_start")
	 private Date contractStart;
	 
	@BsonProperty(value = "contract_end")
	 private Date contractEnd;

	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getProjectCode() {
		return projectCode;
	}

	public void setProjectCode(String projectCode) {
		this.projectCode = projectCode;
	}

	public float getProgress() {
		return progress;
	}

	public void setProgress(float progress) {
		this.progress = progress;
	}

	public Date getContractStart() {
		return contractStart;
	}

	public void setContractStart(Date contractStart) {
		this.contractStart = contractStart;
	}

	public Date getContractEnd() {
		return contractEnd;
	}

	public void setContractEnd(Date contractEnd) {
		this.contractEnd = contractEnd;
	}

	public List<RequestResource> getRequests() {
		return requests;
	}

	public void setRequests(List<RequestResource> requests) {
		this.requests = requests;
	}

	public int getMemberAmount() {
		return memberAmount;
	}

	public void setMemberAmount(int memberAmount) {
		this.memberAmount = memberAmount;
	}

	public String getCustomerCode() {
		return customerCode;
	}

	public void setCustomerCode(String customerCode) {
		this.customerCode = customerCode;
	}
	
	
}

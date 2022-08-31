package sub.document;

import java.io.Serializable;
import java.sql.Date;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;

public class SubProject implements Serializable{
	
	@BsonProperty(value = "project_id")
	private ObjectId projectId;
	
	private float duration;
	
	private float assigned;

	private String startDate;
	
	
	
	private String endDate;


	


	public String getStartDate() {
		return startDate;
	}


	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}


	public String getEndDate() {
		return endDate;
	}


	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}


	public ObjectId getProjectId() {
		return projectId;
	}


	public void setProjectId(ObjectId projectId) {
		this.projectId = projectId;
	}


	public float getDuration() {
		return duration;
	}


	public void setDuration(float duration) {
		this.duration = duration;
	}


	public float getAssigned() {
		return assigned;
	}


	public void setAssigned(float assigned) {
		this.assigned = assigned;
	}


	


	
	
	
}

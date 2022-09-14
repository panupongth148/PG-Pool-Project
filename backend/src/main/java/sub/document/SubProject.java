package sub.document;

import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;

public class SubProject implements Serializable{
	
	@BsonProperty(value = "project_code")
	private String projectCode;
	
	@BsonProperty(value = "working_detail")
	private List<WorkingDetail> workingDetail = new ArrayList<>();

	public String getProjectCode() {
		return projectCode;
	}

	public void setProjectCode(String projectCode) {
		this.projectCode = projectCode;
	}

	public List<WorkingDetail> getWorkingDetail() {
		return workingDetail;
	}

	public void setWorkingDetail(List<WorkingDetail> workingDetail) {
		this.workingDetail = workingDetail;
	}


	

	
	
	


	
	
	
}

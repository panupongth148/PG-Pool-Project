package resource;

import java.util.Date;
import java.util.List;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;

import io.quarkus.mongodb.panache.common.MongoEntity;
import sub.document.SubProject;

@MongoEntity(collection = "resource")
public class Resource {

	private ObjectId id;

	@BsonProperty(value = "emp_no")
	private String empNo;

	@BsonProperty(value = "prefix")
	private String prefix;

	@BsonProperty(value = "first_name")
	private String firstName;

	@BsonProperty(value = "last_name")
	private String lastName;

	@BsonProperty(value = "tel")
	private String tel;

	@BsonProperty(value = "emp_email")
	private String empEmail;

	@BsonProperty(value = "hire_date")
	private Date hireDate;

	@BsonProperty(value = "expire_date")
	private Date expireDate;

	@BsonProperty(value = "position")
	private String position;

	@BsonProperty(value = "projects")
	private List<SubProject> projects;


	@BsonProperty(value = "history")
	private List<ObjectId> history;

	public ObjectId getId() {
		return id;
	}

	public void setId(ObjectId id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getEmpEmail() {
		return empEmail;
	}

	public void setEmpEmail(String empEmail) {
		this.empEmail = empEmail;
	}

	public Date getHireDate() {
		return hireDate;
	}

	public void setHireDate(Date hireDate) {
		this.hireDate = hireDate;
	}

	public Date getExpireDate() {
		return expireDate;
	}

	public void setExpireDate(Date expireDate) {
		this.expireDate = expireDate;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public List<SubProject> getProjects() {
		return projects;
	}

	public void setProjects(List<SubProject> projects) {
		this.projects = projects;
	}

	public List<ObjectId> getHistory() {
		return history;
	}

	public void setHistory(List<ObjectId> history) {
		this.history = history;
	}

	

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}


	public String getEmpNo() {
		return empNo;
	}

	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}

}

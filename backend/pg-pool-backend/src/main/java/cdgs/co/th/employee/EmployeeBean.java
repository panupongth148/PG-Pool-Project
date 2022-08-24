package cdgs.co.th.employee;

import javax.ws.rs.FormParam;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.QueryParam;

public class EmployeeBean {
	@QueryParam("id")
	Integer id;
	
	@QueryParam("firstName")
	String firstName;

	@QueryParam("lastName")
	String lastName;
	
	@QueryParam("gender")
	String gender;

	@QueryParam("department")
	String department;
	
	@HeaderParam("Content-Type")
	   String contentType;
	
	
	public void setId(Integer i) {
		this.id = i;
	}
	
	public Integer getId() {
		return this.id;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getFirstName() {
		return this.firstName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getLastName() {
		return this.lastName;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	public String getGender() {
		return this.gender;
	}
	public void seDepartment(String department) {
		this.department = department;
	}
	
	public String getDepartment() {
		return this.department;
	}
}

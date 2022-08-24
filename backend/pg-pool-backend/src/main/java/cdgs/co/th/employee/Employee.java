package cdgs.co.th.employee;

import java.util.Date;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.QueryHint;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;



@Entity
@Table(name = "employee")
@Cacheable
public class Employee {

    @Id
    @SequenceGenerator(name = "employeeSequence", sequenceName = "employee_id_seq", allocationSize = 1, initialValue = 15)
    @GeneratedValue(generator = "employeeSequence")
    @Column(name="emp_no", updatable = false, nullable = false)
    private Integer id;

    @Column(name="first_name", length = 40)
    private String firstName;
    
    @Column(name="last_name", length = 40)
    private String lastName;
    
    @Column(name="tel", length = 11)
    private String tel;
    
    @Column(name="email", length = 50)
    private String email;
    
    @Column(name="salary")
    private float salary;
    
    @Column(name="hire_date", length = 11)
    private Date hireDate;
    
    @Column(name="expire_date", length = 11)
    private Date expireDate;
    
    @Column(name="position", length = 20)
    private String position;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public float getSalary() {
		return salary;
	}

	public void setSalary(float salary) {
		this.salary = salary;
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


    
 

    

}






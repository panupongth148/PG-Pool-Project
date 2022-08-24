package cdgs.co.th.employee_project;

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

import cdgs.co.th.employee.Employee;
import cdgs.co.th.project.Project;

@Entity
@Table(name = "employee_project")
@Cacheable
public class EmployeeProject {
	
	 @Id
	 @SequenceGenerator(name = "employeeProjectSequence", sequenceName = "employeeProject_id_seq", allocationSize = 1, initialValue = 15)
	 @GeneratedValue(generator = "employeeProjectSequence")
	 @Column(name="emp_pro_id", updatable = false, nullable = false)
	 private Integer id;
	
	 @ManyToOne(fetch = FetchType.EAGER)
	 @JoinColumn(name = "project_id")
	 private Project projectId;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "emp_no")
	private Employee empNo;
	
	@Column(name="start_date", updatable = false, insertable = false)
	 private Date startDate;
	
	@Column(name="end_date", updatable = false, insertable = false)
	 private Date endDate;
	
	@Column(name="duration")
	 private float duration;
	
	@Column(name="assigned")
	 private float assigned;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Project getProjectId() {
		return projectId;
	}

	public void setProjectId(Project projectId) {
		this.projectId = projectId;
	}

	public Employee getEmpNo() {
		return empNo;
	}

	public void setEmpNo(Employee empNo) {
		this.empNo = empNo;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
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

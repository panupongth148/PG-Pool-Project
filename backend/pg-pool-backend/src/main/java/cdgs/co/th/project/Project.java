package cdgs.co.th.project;

import java.util.Date;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.QueryHint;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "project")
@Cacheable
public class Project {
	
	 @Id
	 @SequenceGenerator(name = "projectSequence", sequenceName = "project_id_seq", allocationSize = 1, initialValue = 15)
	 @GeneratedValue(generator = "projectSequence")
	 @Column(name="project_id", updatable = false, nullable = false)
	 private Integer id;
	 
	 
	 @Column(name="project_name", length = 40)
	 private String projectName;
	 
	 @Column(name="project_code", length = 40)
	 private String projectCode;
	 
	 @Column(name="progress", length = 40)
	 private float progress;
	 
	 @Column(name="contract_start")
	 private Date contractStart;
	 
	 @Column(name="contract_end")
	 private Date contractEnd;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
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

	public Date getContract_start() {
		return contractStart;
	}

	public void setContract_start(Date contract_start) {
		this.contractStart = contract_start;
	}

	public Date getContract_end() {
		return contractEnd;
	}

	public void setContract_end(Date contract_end) {
		this.contractEnd = contract_end;
	}
	 
	 
	 
}

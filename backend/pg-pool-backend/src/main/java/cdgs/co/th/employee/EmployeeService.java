package cdgs.co.th.employee;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import cdgs.co.th.employee_project.EmployeeProject;
import io.quarkus.logging.Log;

@ApplicationScoped
public class EmployeeService {
	@Inject
	EmployeeService employeeService;
	@Inject
	EntityManager entityManager;
	
	// register employee to database
	@Transactional
	public boolean deleteByEmployee(Integer empNo) {
		boolean hasError = false;
		String jpql = "select * from employee_project ep where ep.emp_no = " + empNo;
		Query query = entityManager.createNativeQuery(jpql, EmployeeProject.class);
		
		List<EmployeeProject> emps = query.getResultList();
		for (EmployeeProject emp : emps) {
			try {
				System.out.println(emp);
				employeeService.deleteEPById(emp.getId());
				Employee entity = entityManager.getReference(Employee.class, empNo);
				entityManager.remove(entity);
			} catch (Exception e) {
				Log.error(e);
				hasError = true;
			}
		}
		return hasError;
	}
	
	

//	@Transactional
//	public boolean deleteByDepartment(Integer department) {
//		boolean hasError = false;
//		String jpql = "from Employee e where e.department.code = :department ";
//		Query query = entityManager.createQuery(jpql, Employee.class);
//		query.setParameter("department", department);
//		List<Employee> emps = query.getResultList();
//		for (Employee emp : emps) {
//			try {
//				employeeService.deleteById(emp.getId());
//			} catch (Exception e) {
//				Log.error(e);
//				hasError = true;
//			}
//		}
//		return hasError;
//	}

	@Transactional(value = TxType.REQUIRES_NEW)
	public void deleteEPById(Integer id) {
		EmployeeProject entity = entityManager.find(EmployeeProject.class, id);
		entityManager.remove(entity);
	}

}
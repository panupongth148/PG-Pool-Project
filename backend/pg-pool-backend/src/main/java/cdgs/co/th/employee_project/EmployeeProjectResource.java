package cdgs.co.th.employee_project;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import org.jboss.logging.Logger;

import cdgs.co.th.employee.Employee;
import cdgs.co.th.employee.EmployeeResource;


@Path("employee/project")
@ApplicationScoped
@Produces("application/json")
@Consumes("application/json")
public class EmployeeProjectResource {
	
	private static final Logger LOGGER = Logger.getLogger(EmployeeResource.class.getName());

    @Inject
    EntityManager entityManager;

    @GET
    public List<EmployeeProject> get() {
    	
        return entityManager.createNativeQuery("select * from employee_project", EmployeeProject.class)
        		.getResultList();
    }
}
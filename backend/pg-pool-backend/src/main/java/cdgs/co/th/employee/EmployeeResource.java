package cdgs.co.th.employee;


import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.jboss.logging.Logger;

import cdgs.co.th.employee_project.EmployeeProject;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Path("employee")
@ApplicationScoped
@Produces("application/json")
@Consumes("application/json")
public class EmployeeResource {

//    private static final Logger LOGGER = Logger.getLogger(EmployeeResource.class.getName());

    @Inject
    EntityManager entityManager;
    
    @Inject
    EmployeeService employeeService;

    @GET
    public List<Employee> get() {
        return entityManager.createNativeQuery("select * from employee", Employee.class)
        		.getResultList();
    }

    @GET
    @Path("{id}")
    public Employee getSingle(Integer id) {
        Employee entity = entityManager.find(Employee.class, id);
        if (entity == null) {
            throw new WebApplicationException("Employee with id of " + id + " does not exist.", 404);
        }
        return entity;
    }
//    
//    @GET
//    @Path("search")
//    public List<Employee> search(@BeanParam EmployeeBean entity ) {
////    	TypedQuery<Employee> query = entityManager.createNamedQuery("Employees.search", Employee.class);
////    	query.setParameter("firstName", firstName);
////    	query.setParameter("lastName", lastName);
////    	query.setParameter("gender", gender);
////    	query.setParameter("department", department);
////    	List<Employee> result = query.getResultList();
//    	String sql = "select * from employee where 1=1";
//    	System.out.println("Entity : ");
//    	System.out.println(entity.getFirstName());
//    	if(entity.getFirstName() != null) {
//    		sql += " and first_name like :firstName";
//    	}
//    	if(entity.getLastName() != null) {
//    		sql += " and last_name like :lastName";
//    	}
//    	if(entity.getGender() != null) {
//    		sql += " and gender = :gender";
//    	}
//    	if(entity.getDepartment() != null) {
//    		sql += " and department = :department";
//    	}
//    	Query query = entityManager.createNativeQuery(sql.toString(), Employee.class);
//    	if(entity.getFirstName() != null) {
//    		query.setParameter("firstName", entity.getFirstName());
//    	}
//    	if(entity.getLastName() != null) {
//    		query.setParameter("lastName", entity.getLastName());
//    	}
//    	if(entity.getGender() != null) {
//    		query.setParameter("gender", entity.getGender());
//    	}
//    	if(entity.getDepartment() != null) {
//    		query.setParameter("department", entity.getDepartment());
//    	}
//    	return query.getResultList();
//    }
//
	// register employee to database
    @POST
    public Response create(Employee employee) {
        if (employee.getId() != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }
        entityManager.persist(employee);
        return Response.ok(employee).status(201).build();
    }
//    
//    @POST
//    @Path("/upload")
//    @Transactional
//    public String upload() {
//    	return "sucess";
//    }
//
//    @PUT
//    @Path("{id}")
//    @Transactional
//    public Employee update(Integer id, Employee employee) {
//        if (employee.getId() == null && employee.getFirstName() == null && employee.getLastName() == null && employee.getGender() == null) {
//            throw new WebApplicationException("Id was not set on request.", 422);
//        }
//
//        Employee entity = entityManager.find(Employee.class, id);
//
//        if (entity == null) {
//            throw new WebApplicationException("Employee with id of " + id + " does not exist.", 404);
//        }
//
//        entity.setFirstName(employee.getFirstName());
//        entity.setLastName(employee.getLastName());
//        entity.setGender(employee.getGender());
//
//
//        return entity;
//    }
//
    @DELETE
    @Path("{id}")
    public Response delete(Integer id) {
//        Employee entity = entityManager.getReference(Employee.class, id);
//        System.out.println(id);
//        if (entity == null) {
//            throw new WebApplicationException("Employee with id of " + id + " does not exist.", 404);
//        }
//        entityManager.remove(entity);
//        System.out.println("Success");
    	employeeService.deleteByEmployee(id);
        return Response.status(200).build();
    }
    
   
//
//    @Provider
//    public static class ErrorMapper implements ExceptionMapper<Exception> {
//
//        @Inject
//        ObjectMapper objectMapper;
//
//        @Override
//        public Response toResponse(Exception exception) {
//            LOGGER.error("Failed to handle request", exception);
//
//            int code = 500;
//            if (exception instanceof WebApplicationException) {
//                code = ((WebApplicationException) exception).getResponse().getStatus();
//            }
//
//            ObjectNode exceptionJson = objectMapper.createObjectNode();
//            exceptionJson.put("exceptionType", exception.getClass().getName());
//            exceptionJson.put("code", code);
//
//            if (exception.getMessage() != null) {
//                exceptionJson.put("error", exception.getMessage());
//            }
//
//            return Response.status(code)
//                    .entity(exceptionJson)
//                    .build();
//        }

    }


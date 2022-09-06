package project;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;

@Path("/api/project")
@Consumes("application/json")
@Produces("application/json")
public class ProjectResource {
	
	@Inject
	ProjectRepository projectRepository;
	
	@GET
    public List<Project> list() {
        return projectRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public Project get(String id) {
        System.out.println("get =>" + id);
        return projectRepository.findById(new ObjectId(id));
    }

    @POST
    public Response create(Project project) {
        projectRepository.persist(project);
        return Response.status(201).build();
    }

    @PUT
    @Path("/{id}")
    public void update(String id, Project project) {
        projectRepository.update(project);
    }

    @DELETE
    @Path("/{id}")
    public void delete(String id) {
        Project person = projectRepository.findById(new ObjectId(id));
        projectRepository.delete(person);
    }

    @GET
    @Path("/search/{name}")
    public Project search(String name) {
        return projectRepository.findByName(name);
    }

    @DELETE
    public void deleteAll(){
        projectRepository.deleteAll();
    }
}

package resource;

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

import project.Project;

@Path("/resource")
@Consumes("application/json")
@Produces("application/json")
public class ResourceResource {
	
	@Inject
	ResourceRepository resourceRepository;
	
	
	@GET
    public List<Resource> list() {
        return resourceRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public Resource get(String id) {
        System.out.println("get =>" + id);
        return resourceRepository.findById(new ObjectId(id));
    }

    @POST
    public Response create(Resource resource) {
       resourceRepository.persist(resource);
        return Response.status(201).build();
    }

    @PUT
    @Path("/{id}")
    public void update(String id, Resource resource) {
        resourceRepository.update(resource);
    }

    @DELETE
    @Path("/{id}")
    public void delete(String id) {
    	Resource resource = resourceRepository.findById(new ObjectId(id));
        resourceRepository.delete(resource);
    }

    @GET
    @Path("/search/{name}")
    public Resource search(String name) {
        return resourceRepository.findByName(name);
    }

    @DELETE
    public void deleteAll(){
        resourceRepository.deleteAll();
    }

}

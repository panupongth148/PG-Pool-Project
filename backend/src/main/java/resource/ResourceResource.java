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

@Path("/api/resource")
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

    @GET
    @Path("/findbypc/{code}")
    public List<Resource> findByProductCode(String code){
        return resourceRepository.findByProjectCode(code);
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
    public Response delete(String id) {
    	return Response.ok(resourceRepository.deleteResourceById(id)).status(200).build();
    }

    @GET
    @Path("/search/{name}")
    public Resource search(String name) {
        return resourceRepository.findByName(name);
    }

    @GET
    @Path("/empty")
    public Response findResourceEmpty(){
        
        return Response.ok(resourceRepository.findResourcesCanAssigned()).status(200).build();
    }

    @GET
    @Path("/getchartdetail")
    public Response GetBarDetail(){
        
        return Response.ok(resourceRepository.getResourceInRange()).status(200).build();
    }

    @DELETE
    public void deleteAll(){
        resourceRepository.deleteAll();
    }

}

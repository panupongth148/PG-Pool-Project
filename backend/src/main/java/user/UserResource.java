package user;

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

@Path("/api/user")
@Consumes("application/json")
@Produces("application/json")
public class UserResource {
    @Inject
    private UserRepository userRepository;
    @GET
    public List<User> list() {
        return userRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public User get(String id) {
        System.out.println("get =>" + id);
        return userRepository.findById(new ObjectId(id));
    }


    @POST
    public Response create(User user) {
        System.out.println(user);
        userRepository.persist(user);
        return Response.status(201).build();
    }

    @PUT
    @Path("/{id}")
    public void update(String id, User user) {
        userRepository.update(user);
    }

    @DELETE
    @Path("/{id}")
    public void delete(String id) {
        User person = userRepository.findById(new ObjectId(id));
        userRepository.delete(person);
    }

    // @GET
    // @Path("/search/{name}")
    // public Project search(String name) {
    //     return projectRepository.findByName(name);
    // }

    @DELETE
    public void deleteAll() {
        userRepository.deleteAll();
    }
}

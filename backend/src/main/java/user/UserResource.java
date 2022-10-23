package user;

import java.security.Provider;

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
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.wildfly.security.WildFlyElytronProvider;

// import io.quarkus.mailer.Mail;
// import io.quarkus.mailer.reactive.ReactiveMailer;
import io.smallrye.mutiny.Uni;
import lib.Schedule.ScheduleAssigned;
import lib.SendEmail.SendEmail;
import pojo.TokenResponse;

@Path("/api/user")
@Consumes("application/json")
@Produces("application/json")
public class UserResource {
    static final Provider ELYTRON_PROVIDER = new WildFlyElytronProvider();
    private static byte[] salt = ("APPLE").getBytes();
    // @Inject
    // ReactiveMailer reactiveMailer;
    @Inject
    private UserService userService;


    @Inject
    private ScheduleAssigned scheduleAssigned;

    @Inject
    private SendEmail sendEmail;
    // static final String TEST_PASSWORD = "test_password";
    @Inject
    JsonWebToken jwt;

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
        System.out.println(user.getUsername());

        try {
            // user.setPassword(hashPassword(user.getPassword()));
            // System.out.println(user.getPassword());
            // checkPassword(user.getPassword());

            // userService = new UserService();
            String target = user.getPassword();
            String encrypted = userService.encrypt(target);
            user.setPassword(encrypted);
            // String decrypted = userService.decrypt(encrypted);

            // System.out.println("String To Encrypt: " + target);
            // System.out.println("Encrypted String:" + encrypted);
            // System.out.println("Decrypted String:" + decrypted);
            userRepository.persist(user);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }

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

    @POST
    @Path("/login")
    public Response login(User req) {
        // System.out.println("login");
        // GenerateToken genToken = new GenerateToken();
        // String token = genToken.genToken(user);
        // System.out.println(token);
        try {
            // userService = new UserService();

            User user = userRepository.findByUser(req.getUsername());
            String decryptPassword = userService.decrypt(user.getPassword());
            // System.out.println(decryptPassword);
            if (decryptPassword.equals(req.getPassword())) {
                String jwt = userService.generateJwt(user);
                TokenResponse token = new TokenResponse();
                token.setToken(jwt);

                return Response.ok(token).status(200).build();
            } else {
                return Response.ok("Username Or Password Incorrect").status(401).build();
            }

        } catch (Exception e) {
            // TODO: handle exception
            return Response.status(500).build();
        }

    }
    // @GET
    // @Path("/search/{name}")
    // public Project search(String name) {
    // return projectRepository.findByName(name);
    // }

    @DELETE
    public void deleteAll() {
        userRepository.deleteAll();
    }


    @GET
    @Path("/mail")
    public Response sendEmailUsingReactiveMailer() {
        scheduleAssigned.scheduleSendEmail();
        return Response.status(200).build();
    }

}

package project;

import java.io.File;
import java.io.InputStream;
import java.util.List;

import javax.imageio.ImageIO;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;

import org.jboss.resteasy.reactive.MultipartForm;
import org.jboss.resteasy.reactive.server.core.multipart.FormData;

import lib.excel.ReadExcel;
import pojo.ExcelObject;
import resource.ResourceRepository;

import java.awt.image.BufferedImage;




@Path("/api/project")
@Consumes("application/json")
@Produces("application/json")
public class ProjectResource {

    @Inject
    ProjectRepository projectRepository;
    @Inject
    ResourceRepository resourceRepository;

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
        System.out.println(project);
        projectRepository.persist(project);
        return Response.status(201).build();
    }

    
    @POST
    // @Produces(MediaType.APPLICATION_JSON)
    // @Consumes(MediaType.MULTIPART_FORM_DATA)
    
    @Path("/form")
    public ExcelObject form() {
        System.out.println("read excel");
        // return something
        // Flie file = formData.getFile().getAbsoluteFile();
        // FileInputStream fl = new FileInputStream(formData.getFile());
        // byte[] arr = new byte[(int)file.length()];
  
        // // Reading file content to byte array
        // // using standard read() method
        // fl.read(arr);
  
        // // lastly closing an instance of file input stream
        // // to avoid memory leakage
        // fl.close();
        ReadExcel excel = new ReadExcel();
        ExcelObject excelObject = excel.read();
        System.out.println(excelObject.getProject().getProjectName());

        // for(Resource resource : excelObject) {
        //     // System.out.println("Firstname : " + resource.getFirstName());
        //     // System.out.println("Lastname: " + resource.getLastName());
        // }
        // formData.getFile().uploadedFile();
        try {
             projectRepository.persist(excelObject.getProject());
            resourceRepository.persist(excelObject.getResourceList());
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        
        return excelObject;
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
    public void deleteAll() {
        projectRepository.deleteAll();
    }
}

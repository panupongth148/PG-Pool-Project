package project;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.Map;

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
// import org.jboss.resteasy.reactive.server.core.multipart.FormData;

import lib.SaveFile;
import lib.Schedule.ManageDatabase;
import lib.Schedule.ManageResource;
import lib.excel.ReadExcel;
import pojo.Excel.ExcelObject;
import pojo.upload.FormData;
import resource.Resource;
import resource.ResourceRepository;

import java.awt.image.BufferedImage;

@Path("/api/project")

public class ProjectResource {

    @Inject
    ProjectRepository projectRepository;
    @Inject
    ResourceRepository resourceRepository;

    @Inject
    SaveFile saveFile;

    @Inject
    ReadExcel readExcel;

    // test schedule
    @Inject
    ManageResource manageResource;

    @Inject
    ManageDatabase manageDatabase;

    @GET
    @Consumes("application/json")
    @Produces("application/json")
    public List<Project> list() {
        return projectRepository.getProjectPresent();
    }

    @GET
    @Path("/{id}")
    @Consumes("application/json")
    @Produces("application/json")
    public Project get(String id) {
        System.out.println("get =>" + id);
        return projectRepository.findById(new ObjectId(id));
    }

    @GET
    @Path("/findbypc/{id}")
    @Consumes("application/json")
    @Produces("application/json")
    public Project getProjectByPC(String id) {
        System.out.println("get =>" + id);
        return projectRepository.findByProductCode(id);
    }

    @GET
    @Path("/findprojectrequest/")
    @Consumes("application/json")
    @Produces("application/json")
    public List<Resource> findProjectWantResource() {
        return projectRepository.findProjectRequest();
    }

    @GET
    @Path("/getrequest")
    @Consumes("application/json")
    @Produces("application/json")
    public Response findProjectRequest(){
        return Response.ok(projectRepository.getProjectRequest()).status(200).build();
    }


    @GET
    @Path("/findbyownerid/{id}")
    @Consumes("application/json")
    @Produces("application/json")
    public List<Project> getProjectByOwnerId(String id){
        return projectRepository.findProjectByUserId(id);
    }

    @POST
    @Path("/findmanybypc")
    @Consumes("application/json")
    @Produces("application/json")
    public List<Project> getProjectsByPC(List<String> listId) {
        return projectRepository.findProjectsbyPC(listId);
    }

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public Response create(Project project) {
        System.out.println(project);
        projectRepository.persist(project);
        return Response.status(201).build();
    }

    

    @POST
    @Path("/upload")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response upload(@MultipartForm FormData formData) {
        System.out.println(">>>>");
        // for (Map.Entry<String, InputStream> entry : parts.entrySet()){
        // System.out.println(entry.getKey() + ": " + new
        // String(entry.getValue().readAllBytes()));
        // }
        try {
            System.out.println(formData.userId);
            System.out.println("input  = " + formData.file.uploadedFile());
            System.out.println("inputFile = " + formData.file.fileName());

            // System.out.println("content = " +
            // Files.readString(formData.file.uploadedFile()));
            System.out.println("<<<<");
            String located = "./src/main/resources/files/" + formData.file.fileName(); // located File
            // String statusSave =
            // saveFile.saveFile(Files.readAllBytes(formData.file.uploadedFile()), located);
            // System.out.println(statusSave);
            ExcelObject excelObject = readExcel.read(Files.readAllBytes(formData.file.uploadedFile()));
            excelObject.getProject().setProjectOwner(formData.userId);
            System.out.println(excelObject.getProject().getProjectOwner());
            
            // for(Resource resource : excelObject) {
            // // System.out.println("Firstname : " + resource.getFirstName());
            // // System.out.println("Lastname: " + resource.getLastName());
            // }
            // formData.getFile().uploadedFile();
            // List<Project> projectCheckExisList = projectRepository.find("project_code", excelObject.getProject().getProjectCode()).list();
            // if(projectCheckExisList.size() > 0){
            //     System.out.println(projectCheckExisList.get(0).getProjectName());
            //     projectRepository.delete(projectCheckExisList.get(0));
            //     projectRepository.persist(excelObject.getProject());
            //     for(Resource resource: excelObject.getResourceList()){
            //         System.out.println(resource.getFirstName());
            //     }
            //     resourceRepository.persist(excelObject.getResourceList());
            //     return Response.ok(excelObject).status(200).build();
            // }
            // System.out.println("new import");
            // projectRepository.persist(excelObject.getProject());
            // resourceRepository.persist(excelObject.getResourceList());

            return Response.ok(excelObject).status(200).build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.ok(e).status(500).build();
        }

        // try (
        // final BufferedWriter writer = Files.newBufferedWriter(path,
        // StandardCharsets.UTF_8, StandardOpenOption.CREATE);) {
        // writer.write(content);
        // writer.flush();
        // }

    }

    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    @Produces("application/json")
    public void update(String id, Project project) {
        projectRepository.update(project);
    }

    @DELETE
    @Path("/{id}")
    public void delete(String id) {
        Project person = projectRepository.findById(new ObjectId(id));
        projectRepository.delete(person);
    }

    @DELETE
    @Path("/deletealmost/{id}")
    public Response deleteAllAboutProject(String id){
        return Response.ok(projectRepository.deleteProject(id)).status(200).build();
    }

    @GET
    @Path("/search/{name}")
    public Project search(String name) {
        return projectRepository.findByName(name);
    }

    @GET
    @Path("/haverequest")
    @Consumes("application/json")
    @Produces("application/json")
    public Response getProjectHaveRequest(){
        System.out.println("request");
        return Response.ok(projectRepository.getProjectHaveRequest()).status(200).build();
    }

    @DELETE
    public void deleteAll() {
        projectRepository.deleteAll();
    }

    public void saveReport(Byte[] file, String str)
            throws IOException {

    }

    @GET
    @Path("/allamount")
    @Consumes("application/json")
    @Produces("application/json")
    public Response getAllAmount(){
        Integer amount = projectRepository.getAllAmountResource();
        return Response.ok(amount).status(200).build();
    }

    @GET
    @Path("/manageresource")
    @Consumes("application/json")
    @Produces("application/json")
    public Response ManageResourceSchedule(){
        manageResource.manageResource();
        return Response.ok("sucess send api").status(200).build();
    }

    @GET
    @Path("/managedatabase")
    @Consumes("application/json")
    @Produces("application/json")
    public Response ManageDatabaseSchedule(){
        manageDatabase.manageDatabaseProject();
        return Response.ok("sucess send manage database project api").status(200).build();
    }
    
}

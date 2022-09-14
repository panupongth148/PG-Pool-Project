package beans;

import java.io.FileInputStream;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.File;
import org.jboss.resteasy.reactive.MultipartForm;

import excel.ReadExcel;

@Path("api/multipart")
public class Endpoint {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Path("/form")
    public String form(@MultipartForm FormData formData) {
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
        System.out.println(excel.read().getContractStart());
        
        // formData.getFile().uploadedFile();
        return "s";
    }
    // @GET
    // @Produces(MediaType.MULTIPART_FORM_DATA)
    // @Path("file")
    // public DownloadFormData getFile() {
    //     // return something
    //     return true;
    // }
}

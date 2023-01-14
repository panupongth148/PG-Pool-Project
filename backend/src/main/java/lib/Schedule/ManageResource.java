package lib.Schedule;

import java.time.ZoneId;
import java.time.chrono.ThaiBuddhistDate;
import java.util.Date;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;

import io.quarkus.scheduler.Scheduled;
import project.Project;
import project.ProjectRepository;
import resource.Resource;
import resource.ResourceRepository;

@ApplicationScoped
public class ManageResource {
    
    private List<Resource> resources;


    @Inject
    ProjectRepository projectRepository;

    @Inject
    ResourceRepository resourceRepository;

    private LocalDate today;

    public ManageResource(){
        DateTime now = new DateTime();
        this.today = now.toLocalDate();
        // ThaiBuddhistDate tbd = ThaiBuddhistDate.now(ZoneId.systemDefault());
        // String dateNow = tbd.format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        // this.today = org.joda.time.LocalDate.parse(dateNow);
    }

    

    public List<Resource> getResources() {
        return resources;
    }



    public void setResources(List<Resource> resources) {
        this.resources = resources;
    }



    @Scheduled(cron = "{cron.expr}")
    public void manageResource() {
        // System.out.println(today);
        try {
            List<Project> projects = projectRepository.listAll();
        // System.out.println("manage resource");
        for(Project project: projects){
            LocalDate endContract = convertToLocalDate(project.getContractEnd());
            // System.out.println(project.getProjectName());
            // System.out.println(this.today);
            // System.out.println(endContract);
            if(endContract.isBefore(this.today)){
                // System.out.println(project.getProjectName());
                project.setHistory(true);
                this.resources = resourceRepository.find("projects.project_code = ?1", project.getProjectCode()).list();
                // System.out.println(resources);
                for(Resource resource:this.resources){
                    // System.out.println(resource.getFirstName());
                    resource.setProjects(null);
                }
            }
        }

        projectRepository.update(projects);
        resourceRepository.update(this.resources);
        } catch (Exception e) {
            e.printStackTrace();
            // TODO: handle exception
        }
        
    }

    public LocalDate convertToLocalDate(Date date) {
        if (date == null)
            return null;
        return new LocalDate(date);
    }
}

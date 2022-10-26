package project;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

import org.jboss.resteasy.reactive.DateFormat;
import java.time.ZoneId;
import io.quarkus.mongodb.panache.PanacheMongoRepository;
import resource.Resource;
import resource.ResourceRepository;
import sub.document.SubProject;
import sub.document.WorkingDetail;
import user.UserRepository;

@ApplicationScoped
public class ProjectRepository implements PanacheMongoRepository<Project> {

    @Inject
    private ResourceRepository resourceRepository;


    @Inject
    private UserRepository userRepository;

    public Project findByName(String name) {
        return find("project_name", name).firstResult();
    }

    public Project findByProductCode(String code) {
        return find("prodject_code", code).firstResult();
    }

    public List<Project> findProjectsbyPC(List<String> listId) {
        List<Project> listResult = new ArrayList<>();
        for (int i = 0; i < listId.size(); i++) {
            Project p = find("project_code", listId.get(i)).firstResult();
            listResult.add(p);
        }
        return listResult;
    }

    public List<Resource> findProjectRequest() {
        List<Project> listResult = new ArrayList<>();
        // DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        ZoneId defaultZoneId = ZoneId.systemDefault();
        LocalDate now = LocalDate.now();
        System.out.println(now);
        Date date = Date.from(now.atStartOfDay(defaultZoneId).toInstant());
        System.out.println(date);
        List<Resource> resourceList = resourceRepository.find("projects.workingDetail.end_date > ?1", now).list();
        for (Resource resource : resourceList) {
            List<SubProject> projects = resource.getProjects();
            for (SubProject project : projects) {
                for (WorkingDetail workingdetail : project.getWorkingDetail()) {
                    // String date = simpleDateFormat.format(new Date());
                    // Date daynow = new Date(now);
                    // System.out.print(workingdetail.getEndDate());
                    // System.out.print(" = ");
                    // System.out.println(now);s
                    // System.out.println(workingdetail.getEndDate() - date);
                }
            }
        }
        // List<Project> listData = list(" > ?1 and firstname != ?2", )
        return resourceList;
    }
    

    public List<Project> findProjectByUserId(String userId){
         return find("project_owner", userId).list();
    }

    public List<Project> getProjectHaveRequest(){
        List<Project> projects = find("requests is not null").list();
        return projects;
    }
}

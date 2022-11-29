package project;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

import org.bson.types.ObjectId;
import org.jboss.resteasy.reactive.DateFormat;
import org.joda.time.DateTime;

import java.time.ZoneId;
import java.time.chrono.ThaiBuddhistDate;

import io.quarkus.mongodb.panache.PanacheMongoRepository;
import pojo.ResponseChartDataModel;
import pojo.ProjecRequestResponse.ProjectRequest;
import pojo.ProjecRequestResponse.RequestMonthDetail;
import pojo.ProjecRequestResponse.RequestPositionModel;
import resource.Resource;
import resource.ResourceRepository;
import sub.document.RequestResource;
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

    public List<Project> findProjectByUserId(String userId) {
        return find("project_owner = ?1 and history = ?2", userId, false).list();
    }

    public List<Project> getProjectHaveRequest() {
        List<Project> projects = find("requests is not null").list();
        return projects;
    }

    public List<Project> getProjectPresent() {
        return find("history = ?1", false).list();
    }

    public List<ProjectRequest> getProjectRequest() {
        List<ProjectRequest> projectRequestsList = new ArrayList<ProjectRequest>();
        int year = Year.now().getValue();
        // List<String> months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July",
        // "Aug", "Sep", "Oct", "Nov", "Dec"];
        List<Project> projects = find("requests is not null").list();
        // for(int i = 0;i< 12;i++){
        System.out.println("filter request");
        // }

        for (int i = 0; i < 12; i++) {
            ProjectRequest projectRequest = new ProjectRequest();
            List<RequestMonthDetail> requestMonthDetail = new ArrayList<RequestMonthDetail>();

            projectRequest.setMonth(i);
            projectRequest.setRequestMonthDetail(requestMonthDetail);
            projectRequestsList.add(projectRequest);
        }
        for (Project project : projects) {
            System.out.println(project.getProjectName());
            // bug
            // List<RequestResource> requestResources = new ArrayList<RequestResource>();
            for (RequestResource request : project.getRequests()) {
                // bug
                // requestResources.add(request);

                if ((request.getDateWithin().getYear() - year) < 2) {
                    RequestMonthDetail requestMonthDetail = new RequestMonthDetail();
                    requestMonthDetail.setProject(project);
                    requestMonthDetail.setRequestPositionModel(request);
                    // bug
                    // requestMonthDetail.setRequestPositionModel(requestResources);

                    projectRequestsList.get(request.getDateWithin().getMonth()).getRequestMonthDetail()
                            .add(requestMonthDetail);
                    // System.out.println(request.getPositionRequest());
                    // System.out.println(request.getDateWithin());
                    // System.out.println(request.getDateWithin().getMonth());
                }

            }
        }
        return projectRequestsList;
    }

    public Integer getAllAmountResource() {
        Integer allAmount = 0;
        // ThaiBuddhistDate tbd = ThaiBuddhistDate.now(ZoneId.systemDefault());
        // String dateNow =
        // tbd.format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        // org.joda.time.LocalDate now = org.joda.time.LocalDate.parse(dateNow);
        // org.joda.time.LocalDate today = new org.joda.time.LocalDate();
        // org.joda.time.LocalDate d1 = now.plusMonths(12).withDayOfMonth(1);
        // System.out.println(d1);

        DateTime now = new DateTime();
        org.joda.time.LocalDate today = now.toLocalDate();

        List<Project> projects = find("requests is not null").list();
        for (Project project : projects) {
            for (RequestResource request : project.getRequests()) {
                org.joda.time.LocalDate formatJoda = convertToLocalDate(request.getDateWithin());
                if (formatJoda.isBefore(today)) {
                    allAmount = allAmount + request.getAmount();
                }

            }
        }
        return allAmount;
    }

    public String deleteProject(String id) {
        try {
            ObjectId objId = new ObjectId(id);
            Project project = findById(objId);
            String projectCode = project.getProjectCode();
            resourceRepository.deleteByProjectCode(projectCode);
            deleteById(objId);
            return "success";
        } catch (Exception e) {
            // TODO: handle exception
            return e.toString();
        }

    }

    public org.joda.time.LocalDate convertToLocalDate(Date date) {
        if (date == null)
            return null;
        return new org.joda.time.LocalDate(date);
    }
}
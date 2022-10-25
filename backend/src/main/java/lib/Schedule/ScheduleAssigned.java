package lib.Schedule;

import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.chrono.ThaiBuddhistDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.LocalDate;
import org.joda.time.format.DateTimeFormatter;

import io.quarkus.scheduler.Scheduled;
import lib.SendEmail.SendEmail;
import project.Project;
import project.ProjectRepository;
import resource.Resource;
import resource.ResourceRepository;
import sub.document.SubProject;
import sub.document.WorkingDetail;

@ApplicationScoped
public class ScheduleAssigned {

    private List<Resource> listResource;

    private List<Project> listProject;

    @Inject
    private SendEmail sendEmail;

    @Inject
    private ResourceRepository resourceRepository;

    @Inject
    private ProjectRepository projectRepository;

    @Scheduled(cron = "{cron.expr}")
    public void scheduleSendEmail() {
        // Calendar cal = Calendar.getInstance();
        // // creating a constructor of the SimpleDateFormat class
        // SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        // // getting current date
        // System.out.println("Today's date: " + sdf.format(cal.getTime()));
        // Date today = cal.getTime();
        this.listResource = resourceRepository.listAll();
        String message = "<b><p style='font-size:26px'>พนักงานที่จะหมด Assigned</p></b> <br> ";
        List<Resource> result = new ArrayList<>();
        for (Resource resource : this.listResource) {
            // System.out.println(this.listResource);
            if (resource.getProjects() != null) {
                for (SubProject subProject : resource.getProjects()) {
                    Date endDate = subProject.getWorkingDetail().get(subProject.getWorkingDetail().size() - 1)
                            .getEndDate();
                    System.out.println(endDate);
                    ThaiBuddhistDate tbd = ThaiBuddhistDate.now(ZoneId.systemDefault());
                    // System.out.println(tbd.format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd")));
                    String dateNow = tbd.format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                    LocalDate now = LocalDate.parse(dateNow);
                    System.out.println("Now : ");
                    System.out.println(now);
                    LocalDate formatJoda = convertToLocalDate(endDate);
                    System.out.println("Enddate : ");
              
                    System.out.println(formatJoda);
                    System.out.println("------------------");
 
                    System.out.println();
                    long diff = Math.abs(Days.daysBetween(now, formatJoda).getDays());
                    // System.out.println(diff);
                    if (formatJoda.isAfter(now)) {
                        System.out.println("end date : ");
                        System.out.println(endDate);
                        if(diff < 30){
                            System.out.println(subProject.getProjectCode());
                            Project project = projectRepository.find("project_code", subProject.getProjectCode()).firstResult();
                            message = message + "<p style='font-size:18px'>"+(resource.getPrefix() + " " + resource.getFirstName() + " " + resource.getLastName() + "  "+ project.getProjectName() +" ภายใน "+ diff + " วัน</p>");
                        }
                        // long diff = Math.abs(Days.daysBetween(now, formatJoda).getDays());
                        // System.out.println(diff);
                         
                    }
                    

                }
            }

        }
        // System.out.println(message);
        sendEmail.sendEmail("asdfghjklx963@gmail.com", message);
        // System.out.println(this.listResource);
        // System.out.println("Cron expression configured in application.properties");
    }

    public LocalDate convertToLocalDate(Date date) {
        if (date == null)
            return null;
        return new LocalDate(date);
    }

    public java.time.LocalDate convertToLocalDateViaInstant(Date dateToConvert) {
        return dateToConvert.toInstant()
          .atZone(ZoneId.systemDefault())
          .toLocalDate();
    }
}

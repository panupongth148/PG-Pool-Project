package lib.Schedule;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.LocalDate;

import io.quarkus.scheduler.Scheduled;
import project.Project;
import project.ProjectRepository;

@ApplicationScoped
public class ManageDatabase {

    @Inject
    ProjectRepository projectRepository;

    private LocalDate today;

    public ManageDatabase() {
        DateTime now = new DateTime();
        this.today = now.toLocalDate();
    }

    @Scheduled(cron = "{cron.expr}")
    public void manageDatabaseProject() {
        List<Project> backupRoleback = new ArrayList<>();
        try {
            java.time.LocalDate lt = java.time.LocalDate.now();
            List<Project> projects = projectRepository.find("contract_end < ?1", lt).list();

            for (Project project : projects) {
                
                long diff = Math.abs(Days.daysBetween(this.today, convertToLocalDate(project.getContractEnd())).getDays());
                // System.out.println(diff);

                if(diff > 30){
                    projectRepository.delete(project);
                
                    System.out.print("delete : ");
                    System.out.print(project.getProjectName());
                    System.out.println("Success");
                }
                
            }
            
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println("fail : ");
            e.printStackTrace();
        }

    }

    public LocalDate convertToLocalDate(Date date) {
        if (date == null)
            return null;
        return new LocalDate(date);
    }
}

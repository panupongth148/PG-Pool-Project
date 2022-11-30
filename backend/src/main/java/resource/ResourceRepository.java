package resource;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.bson.types.ObjectId;
import org.joda.time.DateTime;
import org.joda.time.LocalDate;

import io.quarkus.mongodb.panache.PanacheMongoRepository;
import pojo.ResponseChartDataModel;
import pojo.Chart.ChartModelResponse;
import pojo.Chart.ResourceDetailInChart;
import project.Project;
import sub.document.SubProject;
import sub.document.WorkingDetail;


@ApplicationScoped
public class ResourceRepository implements PanacheMongoRepository<Resource> {

    private List<ChartModelResponse> chartModelResponses;
    
	public Resource findByName(String name) {
        return find("first_name", name).firstResult();
    }
    public List<Resource> findByProjectCode(String projectCode){
        return find("projects.project_code", projectCode).list();
    }
    public List<Resource> findResourcesCanAssigned(){
        return find("projects is null").list();
    }

    public List<ChartModelResponse> getResourceInRange(){
        List<Resource> resources = find("projects is not null").list();
        DateTime now = new DateTime();
        this.chartModelResponses = new ArrayList<ChartModelResponse>();
        org.joda.time.LocalDate today = now.toLocalDate();
        System.out.println("Date : " + today.getDayOfMonth());
        org.joda.time.LocalDate d1 = today.plusMonths(12).withDayOfMonth(today.getDayOfMonth());
        // System.out.println("Month : "+today.getMonthOfYear());
        // System.out.println("----------------------------------");
        for(int i = 0;i< 12;i++){
            
            
            List<ResourceDetailInChart> resourceDetailInChart = new ArrayList<ResourceDetailInChart>();
            ChartModelResponse chartModelResponse = new ChartModelResponse();
            chartModelResponse.setMonth(i);
            chartModelResponse.setResources(resourceDetailInChart);
            chartModelResponses.add(chartModelResponse);
            
          
        }
        // for(int i = 0;i < today.getMonthOfYear()-1;i++){
        //     List<ResourceDetailInChart> resourceDetailInChart = new ArrayList<ResourceDetailInChart>();
        //     ChartModelResponse chartModelResponse = new ChartModelResponse();
        //     chartModelResponse.setMonth(i);
        //     chartModelResponse.setResources(resourceDetailInChart);
        //     chartModelResponses.add(chartModelResponse);
        // }
        
        // System.out.print("end range : ");
        // System.out.println(d1);
        // System.out.print("resources size: ");
        // System.out.println(resources.size());
        for(Resource resource:resources){
            // System.out.print("Resource Name : ");
            // System.out.println(resource.getFirstName() + " " + resource.getLastName());
            // System.out.print("Project size: ");
            // System.out.println(resource.getProjects().size());
            for(SubProject subProject: resource.getProjects()){
                LocalDate jodaDateStartDate = convertToLocalDate(subProject.getWorkingDetail().get(0).getStartDate());
                LocalDate jodaDateEndDate = convertToLocalDate(subProject.getWorkingDetail().get(subProject.getWorkingDetail().size()-1).getEndDate());
                // System.out.print("Start Date : ");
                // System.out.println(jodaDateStartDate);
                // System.out.print("End Date : ");
                // System.out.println(jodaDateEndDate);
                if(jodaDateEndDate.isBefore(d1)){
                    //set Resource in month list
                    
                    System.out.print("Project Code : ");
                    System.out.println(subProject.getProjectCode());
                    ResourceDetailInChart resourceDetailInChart = new ResourceDetailInChart();
                    
                    resourceDetailInChart.setPrefix(resource.getPrefix());
                    resourceDetailInChart.setFirstName(resource.getFirstName());
                    resourceDetailInChart.setLastName(resource.getLastName());
                    resourceDetailInChart.setPosition(resource.getPosition());
                    resourceDetailInChart.setStartDate(subProject.getWorkingDetail().get(0).getStartDate());
                    resourceDetailInChart.setEndDate(subProject.getWorkingDetail().get(subProject.getWorkingDetail().size()-1).getEndDate());
                    int monthInEnd = subProject.getWorkingDetail().get(subProject.getWorkingDetail().size()-1).getEndDate().getMonth();
                    this.chartModelResponses.get(monthInEnd).getResources().add(resourceDetailInChart);
                    

                }
                System.out.println("-----------------------------------");
            }
        }
        return this.chartModelResponses;
        
    }

    public void deleteByProjectCode(String projectCode){
        System.out.println(projectCode);
        System.out.println("delete project");
        List<Resource> resources = find("projects.project_code", projectCode).list();
        try {
            for(Resource resource:resources){
                deleteById(resource.getId());
            }
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        
    }
    public org.joda.time.LocalDate convertToLocalDate(Date date) {
        if (date == null)
            return null;
        return new org.joda.time.LocalDate(date);
    }

    public String deleteResourceById(String id){
        try {
            System.out.println(id);
            ObjectId objId = new ObjectId(id);
            deleteById(objId);
            return "success";
        } catch (Exception e) {
            // TODO: handle exception
            return e.toString();
        }
    }
}

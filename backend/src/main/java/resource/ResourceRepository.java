package resource;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;

import io.quarkus.mongodb.panache.PanacheMongoRepository;
import pojo.ResponseChartDataModel;
import project.Project;
import sub.document.SubProject;
import sub.document.WorkingDetail;


@ApplicationScoped
public class ResourceRepository implements PanacheMongoRepository<Resource> {

    @Inject
    private List<ResponseChartDataModel> responseChartDataModelList = new ArrayList<>();
    
	public Resource findByName(String name) {
        return find("first_name", name).firstResult();
    }
    public List<Resource> findByProjectCode(String projectCode){
        return find("projects.project_code", projectCode).list();
    }
    public List<Resource> findResourcesCanAssigned(){
        return find("projects is null").list();
    }

    public void getResourceInRange(){
        List<Resource> resources = find("projects is not null").list();
        DateTime now = new DateTime();
        org.joda.time.LocalDate today = now.toLocalDate();
        org.joda.time.LocalDate d1 = today.plusMonths(12).withDayOfMonth(1);
        for(int i = today.getYear();i< 12;i++){
            ResponseChartDataModel responseChartDataModel = new ResponseChartDataModel();
            responseChartDataModel.setMonth(i);
            responseChartDataModel.setResources(new ArrayList<Resource>());
            this.responseChartDataModelList.add(responseChartDataModel);
        }
        System.out.println(d1);
        for(Resource resource:resources){
            for(SubProject subProject: resource.getProjects()){
                LocalDate jodaDateStartDate = convertToLocalDate(subProject.getWorkingDetail().get(0).getStartDate());
                LocalDate jodaDateEndDate = convertToLocalDate(subProject.getWorkingDetail().get(subProject.getWorkingDetail().size()-1).getEndDate());
                if(jodaDateStartDate.isAfter(today) && jodaDateEndDate.isBefore(d1)){
                    //set Resource in month list
                }
            }
        }
        
    }
    public org.joda.time.LocalDate convertToLocalDate(Date date) {
        if (date == null)
            return null;
        return new org.joda.time.LocalDate(date);
    }
}

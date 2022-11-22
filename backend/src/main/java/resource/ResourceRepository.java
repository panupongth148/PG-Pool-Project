package resource;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;

import io.quarkus.mongodb.panache.PanacheMongoRepository;
import project.Project;
import sub.document.SubProject;


@ApplicationScoped
public class ResourceRepository implements PanacheMongoRepository<Resource> {
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
        
    }
}

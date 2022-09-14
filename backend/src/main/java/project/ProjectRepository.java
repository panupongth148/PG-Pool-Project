package project;



import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

import io.quarkus.mongodb.panache.PanacheMongoRepository;


@ApplicationScoped
public class ProjectRepository implements PanacheMongoRepository<Project>{
	public Project findByName(String name) {
        return find("project_name", name).firstResult();
    }

    // @Transactional
    // public boolean saveProject(Project project){
    //     persist(project);
    //     return true;
        
    // }
}

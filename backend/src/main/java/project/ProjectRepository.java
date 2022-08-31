package project;



import javax.enterprise.context.ApplicationScoped;

import io.quarkus.mongodb.panache.PanacheMongoRepository;


@ApplicationScoped
public class ProjectRepository implements PanacheMongoRepository<Project>{
	public Project findByName(String name) {
        return find("project_name", name).firstResult();
    }
}

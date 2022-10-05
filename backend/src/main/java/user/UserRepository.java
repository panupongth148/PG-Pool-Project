package user;

import javax.enterprise.context.ApplicationScoped;

import io.quarkus.mongodb.panache.PanacheMongoRepository;

@ApplicationScoped
public class UserRepository implements PanacheMongoRepository<User>{
    public User findByUser(String username){
        return find("username", username).firstResult();
    }
}

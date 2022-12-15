package pojo;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class ResourceEmpty {
    
	private String prefix;

	
	private String firstName;

	
	private String lastName;

    private double working;

    private String position;

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public double getWorking() {
        return working;
    }

    public void setWorking(double working) {
        this.working = working;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    
}

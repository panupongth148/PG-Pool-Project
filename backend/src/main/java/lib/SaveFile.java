package lib;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.inject.Singleton;


@Singleton
public class SaveFile {
    public static String saveFile(byte[] bytes, String located) throws IOException{
        System.out.println("readfile");
        Path path = Paths.get(located);
        Files.write(path, bytes);
        return "success";
    }
    
}

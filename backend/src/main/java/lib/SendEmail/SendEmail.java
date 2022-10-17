package lib.SendEmail;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;
import javax.inject.Singleton;

@Singleton
public class SendEmail {
    public static String sendEmail(String emailReciever) {
          // Recipient's email ID needs to be mentioned.
          String to = emailReciever;

          // Sender's email ID needs to be mentioned
          String from = "mailsender148@gmail.com";
  
          // Assuming you are sending email from through gmails smtp
          String host = "smtp.gmail.com";
  
          // Get system properties
          Properties properties = System.getProperties();
  
          // Setup mail server
          properties.put("mail.smtp.host", host);
          properties.put("mail.smtp.port", "465");
          properties.put("mail.smtp.ssl.enable", "true");
          properties.put("mail.smtp.auth", "true");
  
          // Get the Session object.// and pass username and password
          Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
  
              protected PasswordAuthentication getPasswordAuthentication() {
  
                  return new PasswordAuthentication("mailsender148@gmail.com", "sbcquvfbuounabfp");
  
              }
  
          });
  
          // Used to debug SMTP issues
          session.setDebug(true);
  
          try {
              // Create a default MimeMessage object.
              MimeMessage message = new MimeMessage(session);
  
              // Set From: header field of the header.
              message.setFrom(new InternetAddress(from));
  
              // Set To: header field of the header.
              message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
  
              // Set Subject: header field
              message.setSubject("หัวข้อ");
  
              // Now set the actual message
              message.setText("เนื้อหาภายใน");
  
              System.out.println("sending...");
              // Send message
              Transport.send(message);
              System.out.println("Sent message successfully....");
              return "success";
          } catch (MessagingException mex) {
              mex.printStackTrace();
              return "fail";
          }
  
    }
}
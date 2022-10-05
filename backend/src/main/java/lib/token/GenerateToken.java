package lib.token;

import java.util.Arrays;
import java.util.HashSet;

import javax.inject.Singleton;



import io.smallrye.jwt.build.Jwt;


@Singleton
public class GenerateToken {
  public String generateJwt() {
    return Jwt.issuer("amazon-jwt")
        .subject("amazon-cart")
        .groups("writer").expiresAt(System.currentTimeMillis() + 3600).sign();
  }
}

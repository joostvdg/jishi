package com.github.joostvdg.jishi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
/* Else SpringFox's Swagger hook will not detect @RepositoryRestResource resources*/
@Import({springfox.documentation.spring.data.rest.configuration.SpringDataRestConfiguration.class})
public class JishiApplication {

	public static void main(String[] args) {
		SpringApplication.run(JishiApplication.class, args);
	}


}

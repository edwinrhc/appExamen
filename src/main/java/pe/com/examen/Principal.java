package pe.com.examen;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Principal extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(Principal.class, args);
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(Principal.class);
	}

	@Bean
	public OpenAPI customOpenAPI(){
		return new OpenAPI()
				.info(new Info()
						.title("Aplicación AppExamen")
						.version("0.0.1")
						.description("Con Spring Boot")
						.termsOfService("http://swagger.io/terms")
						.license(new License()
						.name("Apache Tomcat").url("http://springdoc.org")));
	}
}

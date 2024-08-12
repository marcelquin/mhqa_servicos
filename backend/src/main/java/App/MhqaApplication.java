package App;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "MHQA sistemas mini-ecommerce preção de servços",
		version = "1.9",
		description = "Gerencia de estoque e venda"))
public class MhqaApplication {

	public static void main(String[] args) {
		SpringApplication.run(MhqaApplication.class, args);
	}

}

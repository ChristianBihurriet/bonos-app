package cb.dam.bonos.controller;


import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SecurityRequirement(name = "bearerAuth")
@RestController
public class TestController {

    @GetMapping("/api/test")
    public String test() {
        return "JWT funciona correctamente";
    }
}
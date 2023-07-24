package com.sucoder.beta.controller;


import com.sucoder.beta.servicio.ServicioCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping
public class CodeGeneratorController {

  /*@GetMapping("/procedimiento.html")
  public String redirectToProcedimiento() {
    // This method will redirect to procedimiento.html
    return "procedimiento";
  }*/


  /*@GetMapping("/redirectToProcedimiento")
  public String showProcedimientoPage(Model model) {
    // Add any model attributes you want to pass to the template
    model.addAttribute("message", "Welcome to Procedimiento Page!");
    return "procedimiento"; // Return the name of the Thymeleaf template (without the ".html" extension)
  }

  @GetMapping("/redirectToCodigo")
  public String redirectToCodigo(RedirectAttributes attributes) {
    // Assuming "Codigo" is a Thymeleaf template named "Codigo.html"
    // This will redirect the user to the "Codigo" page
    attributes.addFlashAttribute("attribute", "redirectWithRedirectPrefix");
    return "redirect:/Codigo";
  }*/

  private final ServicioCodeGenerator codeGeneratorService;

  @Autowired
  public CodeGeneratorController(ServicioCodeGenerator codeGeneratorService) {
    this.codeGeneratorService = codeGeneratorService;
  }

  @GetMapping("/redirectToProcedimiento")
  public String redirectToProcedimiento(Model model) {
    // Call the generateJavaCode method from the ServicioCodeGenerator
    String generatedCode = codeGeneratorService.generateJavaCode("User Input Data");
    model.addAttribute("generatedCode", generatedCode);

    // Redirect to procedimiento.html
    return "redirect:/procedimiento.html";
  }

  @PostMapping("/generate-code")
  public ResponseEntity<String> generateJavaCode(@RequestBody String userInput) {
    String generatedCode = codeGeneratorService.generateJavaCode(userInput);
    return new ResponseEntity<>(generatedCode, HttpStatus.OK);
  }
}
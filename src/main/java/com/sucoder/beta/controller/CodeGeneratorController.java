package com.sucoder.beta.controller;


import com.sucoder.beta.servicio.ServicioCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping
public class CodeGeneratorController {

  private final ServicioCodeGenerator codeGeneratorService;

  @Autowired
  public CodeGeneratorController(ServicioCodeGenerator codeGeneratorService) {
    this.codeGeneratorService = codeGeneratorService;
  }

  @PostMapping("/generate-code")
  public ResponseEntity<String> generateJavaCode(@RequestBody String userInput) {
    String generatedCode = codeGeneratorService.generateJavaCode(userInput);
    return new ResponseEntity<>(generatedCode, HttpStatus.OK);
  }
}
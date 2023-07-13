package com.sucoder.beta.controller;

import com.sucoder.beta.request.CodeGenerationRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.stereotype.Controller;

@Controller
public class CodeGeneratorController {

  @GetMapping("/redirectToProcedimiento")
  public String redirectToProcedimiento() {
    return "Procedimiento";
  }

  @GetMapping("/redirectToCodigo")
  public String redirectToCodigo() {
    return "Codigo";
  }

  @PostMapping("/generate-code")
  public String generateCode(@RequestBody CodeGenerationRequest request) {
    String structure = request.getStructure();
    String attribute1Name = request.getAttribute1Name();
    String attribute1Value = request.getAttribute1Value();
    String attribute1Type = request.getAttribute1Type();
    String attribute2Name = request.getAttribute2Name();
    String attribute2Value = request.getAttribute2Value();
    String attribute2Type = request.getAttribute2Type();
    String comparisonOperator = request.getComparisonOperator();
    String trueMessage = request.getTrueMessage();
    String elseMessage = request.getElseMessage();

    // Generar el código Java en base a los valores recibidos
    String javaCode = generateJavaCode(structure, attribute1Name, attribute1Value, attribute1Type,
        attribute2Name, attribute2Value, attribute2Type, comparisonOperator, trueMessage, elseMessage);

    return javaCode;
  }

  private String generateJavaCode(String structure, String attribute1Name, String attribute1Value,
      String attribute1Type, String attribute2Name, String attribute2Value, String attribute2Type,
      String comparisonOperator, String trueMessage, String elseMessage) {
    StringBuilder javaCode = new StringBuilder();

    if (structure.equals("if")) {
      javaCode.append("if (").append(attribute1Name).append(" ").append(comparisonOperator).append(" ").append(attribute2Name).append(") {\n");
      javaCode.append("    System.out.println(\"").append(trueMessage).append("\");\n");
      javaCode.append("} else {\n");
      javaCode.append("    System.out.println(\"").append(elseMessage).append("\");\n");
      javaCode.append("}");

      return javaCode.toString();
    }

    return "";
  }
}
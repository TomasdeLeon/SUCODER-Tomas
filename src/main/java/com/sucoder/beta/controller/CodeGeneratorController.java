package com.sucoder.beta.controller;


import com.sucoder.beta.request.CodeGenerationRequest;
/*import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CodeGeneratorController {

    /*@PostMapping("/generate-code")
    public String generateCode(@RequestBody CodeGenerationRequest request) {
        String structure = request.getStructure();
        String trueMessage = request.getTrueMessage();
        String elseMessage = request.getElseMessage();

        if (!"if".equalsIgnoreCase(structure)) {
            return "Unsupported structure: " + structure;
        }

        // Generate the Java code based on the "if" structure
        StringBuilder codeBuilder = new StringBuilder() ;
        codeBuilder.append("if (condition) {\n");
        codeBuilder.append("    System.out.println(\"").append(trueMessage).append("\");\n");
        codeBuilder.append("} else {\n");
        codeBuilder.append("    System.out.println(\"").append(elseMessage).append("\");\n");
        codeBuilder.append("}");

        // You can use the generated code as per your requirements
        String generatedCode = codeBuilder.toString();
        System.out.println("Generated Java code:\n" + generatedCode);

        return generatedCode;
    }*/
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CodeGeneratorController {

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

    // Generate the Java code based on the received values
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

    // Handle other structures here if needed

    return "";
  }
}
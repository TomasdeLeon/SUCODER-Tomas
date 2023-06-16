package com.sucoder.beta.controller;


import com.sucoder.beta.request.CodeGenerationRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CodeGeneratorController {

    @PostMapping("/generate-code")
    public String generateCode(@RequestBody CodeGenerationRequest request) {
        String structure = request.getStructure();
        String trueMessage = request.getTrueMessage();
        String elseMessage = request.getElseMessage();

        if (!"if".equalsIgnoreCase(structure)) {
            return "Unsupported structure: " + structure;
        }

        // Generate the Java code based on the "if" structure
        StringBuilder codeBuilder = new StringBuilder();
        codeBuilder.append("if (condition) {\n");
        codeBuilder.append("    System.out.println(\"").append(trueMessage).append("\");\n");
        codeBuilder.append("} else {\n");
        codeBuilder.append("    System.out.println(\"").append(elseMessage).append("\");\n");
        codeBuilder.append("}");

        // You can use the generated code as per your requirements
        String generatedCode = codeBuilder.toString();
        System.out.println("Generated Java code:\n" + generatedCode);

        return generatedCode;
    }

}
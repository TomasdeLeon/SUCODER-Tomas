package com.sucoder.beta.request;

public class CodeGenerationRequest {
    private String structure;
    private String trueMessage;
    private String elseMessage;

    public String getStructure() {
        return structure;
    }

    public void setStructure(String structure) {
        this.structure = structure;
    }

    public String getTrueMessage() {
        return trueMessage;
    }

    public void setTrueMessage(String trueMessage) {
        this.trueMessage = trueMessage;
    }

    public String getElseMessage() {
        return elseMessage;
    }

    public void setElseMessage(String elseMessage) {
        this.elseMessage = elseMessage;
    }
}



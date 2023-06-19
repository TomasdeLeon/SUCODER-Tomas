package com.sucoder.beta.request;

public class CodeGenerationRequest {
    /*private String structure;
    private String trueMessage;
    private String elseMessage;*/

    private String structure;
    private String attribute1Name;
    private String attribute1Value;
    private String attribute1Type;
    private String attribute2Name;
    private String attribute2Value;
    private String attribute2Type;
    private String comparisonOperator;
    private String trueMessage;
    private String elseMessage;

    public String getAttribute1Name() {
        return attribute1Name;
    }

    public String getAttribute1Value() {
        return attribute1Value;
    }

    public String getAttribute1Type() {
        return attribute1Type;
    }

    public String getAttribute2Name() {
        return attribute2Name;
    }

    public String getAttribute2Value() {
        return attribute2Value;
    }

    public String getAttribute2Type() {
        return attribute2Type;
    }

    public void setAttribute2Type(String attribute2Type) {
        this.attribute2Type = attribute2Type;
    }

    public void setAttribute2Value(String attribute2Value) {
        this.attribute2Value = attribute2Value;
    }

    public void setAttribute2Name(String attribute2Name) {
        this.attribute2Name = attribute2Name;
    }

    public void setAttribute1Type(String attribute1Type) {
        this.attribute1Type = attribute1Type;
    }

    public void setAttribute1Value(String attribute1Value) {
        this.attribute1Value = attribute1Value;
    }

    public void setAttribute1Name(String attribute1Name) {
        this.attribute1Name = attribute1Name;
    }

    public String getComparisonOperator() {
        return comparisonOperator;
    }

    public void setComparisonOperator(String comparisonOperator) {
        this.comparisonOperator = comparisonOperator;
    }

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



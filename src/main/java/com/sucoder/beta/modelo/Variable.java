package com.sucoder.beta.modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Variable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String variableName;
    private String variableType;
    private String variableValue;

    // Constructors, getters, setters, and other methods

    public Variable() {
    }

    public Variable(String variableName, String variableType, String variableValue) {
        this.variableName = variableName;
        this.variableType = variableType;
        this.variableValue = variableValue;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVariableName() {
        return variableName;
    }

    public void setVariableName(String variableName) {
        this.variableName = variableName;
    }

    public String getVariableType() {
        return variableType;
    }

    public void setVariableType(String variableType) {
        this.variableType = variableType;
    }

    public String getVariableValue() {
        return variableValue;
    }

    public void setVariableValue(String variableValue) {
        this.variableValue = variableValue;
    }

    @Override
    public String toString() {
        return "Variable{" +
                "id=" + id +
                ", variableName='" + variableName + '\'' +
                ", variableType='" + variableType + '\'' +
                ", variableValue='" + variableValue + '\'' +
                '}';
    }
}

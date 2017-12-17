package com.github.joostvdg.jishi.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Attribute {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(max = 64)
    @Column(unique = true, length = 64, nullable = false)
    private String key;

    @NotNull
    @Column(nullable = false)
    private String value;

    @ManyToOne
    @NotNull
    private TemplateAttribute template;

    Attribute(){}

    Attribute(TemplateAttribute template){
        this.template = template;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public TemplateAttribute getTemplate() {
        return template;
    }

    public void setTemplate(TemplateAttribute template) {
        this.template = template;
    }
}

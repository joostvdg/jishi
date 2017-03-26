package com.github.joostvdg.jishi.model;

import com.github.joostvdg.jishi.model.extend.ConfigurationItemType;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class ConfigurationItemInstance {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String name;
    private String description;

    private LocalDate dateCreated;
    private LocalDate dateModified;

    @ManyToOne
    private ConfigurationItemTemplate template;

    @ManyToOne
    private ConfigurationItemInstance parent;

    @Enumerated(EnumType.STRING)
    private ConfigurationItemType type;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    public LocalDate getDateModified() {
        return dateModified;
    }

    public void setDateModified(LocalDate dateModified) {
        this.dateModified = dateModified;
    }

    public ConfigurationItemTemplate getTemplate() {
        return template;
    }

    public void setTemplate(ConfigurationItemTemplate template) {
        this.template = template;
    }

    public ConfigurationItemInstance getParent() {
        return parent;
    }

    public void setParent(ConfigurationItemInstance parent) {
        this.parent = parent;
    }

    public ConfigurationItemType getType() {
        return type;
    }

    public void setType(ConfigurationItemType type) {
        this.type = type;
    }
}

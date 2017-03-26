package com.github.joostvdg.jishi.model;

import com.github.joostvdg.jishi.model.extend.ConfigurationItemType;

import javax.persistence.*;
import java.util.Set;

@Entity
public class ConfigurationItemTemplate {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @ManyToMany
    private Set<Label> labels;

    @ManyToOne
    private ConfigurationItemTemplate parent;
    private String description;

    @Enumerated(EnumType.STRING)
    private ConfigurationItemType type;

    public ConfigurationItemTemplate(){

    }

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

    public Set<Label> getLabels() {
        return labels;
    }

    public void setLabels(Set<Label> labels) {
        this.labels = labels;
    }

    public ConfigurationItemTemplate getParent() {
        return parent;
    }

    public void setParent(ConfigurationItemTemplate parent) {
        this.parent = parent;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ConfigurationItemType getType() {
        return type;
    }

    public void setType(ConfigurationItemType type) {
        this.type = type;
    }
}

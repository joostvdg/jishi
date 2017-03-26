package com.github.joostvdg.jishi.model;

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

}

package com.github.joostvdg.jishi.repository;

import com.github.joostvdg.jishi.model.ConfigurationItemTemplate;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "template", path = "template")
public interface ConfigurationItemTemplateRepository extends PagingAndSortingRepository<ConfigurationItemTemplate, Long> {
}

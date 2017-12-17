package com.github.joostvdg.jishi.repository;

import com.github.joostvdg.jishi.model.TemplateAttribute;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "templateAttribute", path = "templateAttribute")
public interface TemplateAttributeRepository extends PagingAndSortingRepository<TemplateAttribute, Long> {
}

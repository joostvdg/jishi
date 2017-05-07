package com.github.joostvdg.jishi.repository;

import com.github.joostvdg.jishi.model.Attribute;
import com.github.joostvdg.jishi.model.TemplateAttribute;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "attribute", path = "attribute")
public interface AttributeRepository extends PagingAndSortingRepository<Attribute, Long> {
}

package com.github.joostvdg.jishi.repository;

import com.github.joostvdg.jishi.model.Label;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "label", path = "label")
public interface LabelRepository extends PagingAndSortingRepository<Label, Long> {

}

package com.github.joostvdg.jishi.repository;

import com.github.joostvdg.jishi.model.ConfigurationItemInstance;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "ConfigurationItemInstanceRepository", path = "instance")
public interface ConfigurationItemInstanceRepository extends PagingAndSortingRepository<ConfigurationItemInstance, Long> {
}

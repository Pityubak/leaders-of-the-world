package com.pityubak.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.repository.CrudRepository;

import com.pityubak.entity.Badge;

public interface BadgeRepository extends CrudRepository<Badge, UUID> {

	@EntityGraph(type = EntityGraphType.FETCH, attributePaths = { "leaders" })
	Iterable<Badge> findAll();

	@EntityGraph(type = EntityGraphType.FETCH, attributePaths = { "leaders" })
	Optional<Badge> findById(UUID id);

	@EntityGraph(type = EntityGraphType.FETCH, attributePaths = { "leaders" })
	Badge findByLabel(String label);

}

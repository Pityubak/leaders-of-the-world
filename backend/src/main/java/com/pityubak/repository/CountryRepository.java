package com.pityubak.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.repository.CrudRepository;

import com.pityubak.entity.Country;

public interface CountryRepository extends CrudRepository<Country, UUID> {

	@EntityGraph(type = EntityGraphType.FETCH, attributePaths = { "leaders" })
	Iterable<Country> findAll();

	@EntityGraph(type = EntityGraphType.FETCH, attributePaths = { "leaders" })
	Optional<Country> findById(UUID id);

	@EntityGraph(type = EntityGraphType.FETCH, attributePaths = { "leaders" })
	Optional<Country> findByFullNameAndShortName(String fullName, String shortName);
	
	@EntityGraph(type = EntityGraphType.FETCH, attributePaths = { "leaders"})
	Optional<Country> findByShortName(String shortName);
}

package com.pityubak.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.repository.CrudRepository;

import com.pityubak.entity.Leader;

public interface LeaderRepository extends CrudRepository<Leader, UUID> {

	@EntityGraph(type = EntityGraphType.FETCH, attributePaths = { "badges", "countries" })
	Iterable<Leader> findAll();
	
	@EntityGraph(type = EntityGraphType.FETCH, attributePaths = { "badges", "countries" })
	Optional<Leader> findById(UUID id);
	
	@EntityGraph(type = EntityGraphType.FETCH, attributePaths = { "badges", "countries" })
	<S extends Leader> S save(S entity);
	
	Leader findByNameAndTimeInterval(String name, String timeInterval);

}

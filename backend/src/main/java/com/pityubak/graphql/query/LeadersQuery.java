package com.pityubak.graphql.query;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import com.pityubak.entity.Leader;
import com.pityubak.repository.LeaderRepository;

import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class LeadersQuery implements GraphQLQueryResolver {

	private final LeaderRepository repo;

	public Iterable<Leader> leaders() {
		return repo.findAll();
	}

	public List<Leader> leadersBy(String name) {
		Iterable<Leader> leaders = repo.findAll();
		List<Leader> returnedLeaders = new ArrayList<>();
		leaders.forEach(lead -> {
			if (lead.getName().contains(name)) {
				returnedLeaders.add(lead);
			}
		});
		return returnedLeaders;
	}
}

package com.pityubak.graphql.query;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import com.pityubak.entity.Badge;
import com.pityubak.repository.BadgeRepository;

import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class BadgesQuery implements GraphQLQueryResolver {

	private final BadgeRepository repo;

	public Iterable<Badge> badges() {
		return repo.findAll();
	}

	public List<Badge> badgesBy(String label) {
		Iterable<Badge> badges = repo.findAll();
		List<Badge> returnedBadges = new ArrayList<>();
			badges.forEach(badge -> {
				if (badge.getLabel().contains(label)) {
					returnedBadges.add(badge);
				}
			});

		return returnedBadges;
	}
}

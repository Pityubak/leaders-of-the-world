package com.pityubak.graphql.mutation;

import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.stereotype.Component;
import com.pityubak.entity.Badge;
import com.pityubak.error.AlreadyExistException;
import com.pityubak.graphql.input.UpdateBadgeInput;
import com.pityubak.repository.BadgeRepository;

import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class BadgeMutations implements GraphQLMutationResolver {

	private final BadgeRepository repo;

	public Badge createBadge(String label) {
		Badge oldBadge = repo.findByLabel(label);
		if (oldBadge != null) {
			throw new AlreadyExistException("Badge  already exists with this label");
		}
		Badge badge = new Badge();
		badge.setLabel(label);
		return repo.save(badge);
	}

	public Badge updateBadge(UpdateBadgeInput input) {
		Badge targetBadge = repo.findById(input.getId())
				.orElseThrow(() -> new NoSuchElementException("Invalid id. Update not success."));
		targetBadge.setLabel(input.getLabel());

		return repo.save(targetBadge);
	}

	public Badge deleteBadge(UUID id) {
		Badge deletedBadge = repo.findById(id).orElseThrow(
				() -> new NoSuchElementException("Delete not allowed. This id is not belong to any Leader"));
		repo.delete(deletedBadge);
		return deletedBadge;
	}
}

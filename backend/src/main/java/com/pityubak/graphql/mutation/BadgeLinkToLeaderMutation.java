package com.pityubak.graphql.mutation;

import java.util.NoSuchElementException;
import java.util.Set;

import org.springframework.stereotype.Component;
import com.pityubak.entity.Badge;
import com.pityubak.entity.Leader;
import com.pityubak.graphql.input.ToLeaderRelationInput;
import com.pityubak.repository.BadgeRepository;
import com.pityubak.repository.LeaderRepository;

import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class BadgeLinkToLeaderMutation implements GraphQLMutationResolver {

	private final BadgeRepository badgeRepo;
	private final LeaderRepository leaderRepo;

	public Leader addBadgeToLeader(ToLeaderRelationInput input) {
		Badge badge = badgeRepo.findById(input.getChildId())
				.orElseThrow(() -> new NoSuchElementException("Badge does not exist"));
		Leader leader = leaderRepo.findById(input.getLeaderId())
				.orElseThrow(() -> new NoSuchElementException("Leader does not exist"));
		leader.addBadge(badge);
		return leaderRepo.save(leader);

	}

	public Badge deleteBadgeFromLeader(ToLeaderRelationInput input) {
		Leader targetLeader = leaderRepo.findById(input.getLeaderId())
				.orElseThrow(() -> new NoSuchElementException("Leader does not exist with this id."));
		Badge deletedBadge = badgeRepo.findById(input.getChildId())
				.orElseThrow(() -> new NoSuchElementException("Badge does not exist with this id."));

		Set<Badge> badges = targetLeader.getBadges();
		badges.remove(deletedBadge);
		targetLeader.setBadges(badges);
		leaderRepo.save(targetLeader);
		return deletedBadge;
	}
}

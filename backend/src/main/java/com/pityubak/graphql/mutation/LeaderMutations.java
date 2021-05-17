package com.pityubak.graphql.mutation;

import java.util.NoSuchElementException;
import java.util.UUID;

import javax.servlet.http.Part;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pityubak.entity.Leader;
import com.pityubak.error.AlreadyExistException;
import com.pityubak.graphql.input.CreateLeaderInput;
import com.pityubak.graphql.input.UpdateLeaderInput;
import com.pityubak.repository.ImageRepository;
import com.pityubak.repository.LeaderRepository;

import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class LeaderMutations implements GraphQLMutationResolver {

	private final LeaderRepository repo;
	@Autowired
	private final ImageRepository imgRepo;

	public Leader createLeader(CreateLeaderInput input) {
		Leader existedLeader = repo.findByNameAndTimeInterval(input.getName(), input.getTimeInterval());
		if (existedLeader != null) {
			throw new AlreadyExistException("Leader already exists with this name and interval");
		}
		Leader leader = new Leader();
		leader.setName(input.getName());
		leader.setTimeInterval(input.getTimeInterval());
		leader.setDescription(input.getDescription());
		return repo.save(leader);
	}

	public Leader updateLeader(UpdateLeaderInput input) {
		Leader targetLeader = repo.findById(input.getId())
				.orElseThrow(() -> new NoSuchElementException("Cannot update leader.Invalid id."));

		targetLeader.setName(input.getName());
		targetLeader.setTimeInterval(input.getTimeInterval());
		targetLeader.setDescription(input.getDescription());
		return repo.save(targetLeader);
	}

	public Leader deleteLeader(UUID id) {
		Leader deletedLeader = repo.findById(id)
				.orElseThrow(() -> new NoSuchElementException("Cannot delete Leader.Invalid id."));
		repo.delete(deletedLeader);
		return deletedLeader;
	}

	public Leader addLike(UUID id) {
		Leader leader = repo.findById(id).orElseThrow(() -> new NoSuchElementException("Invalid id."));
		leader.addLike();
		return repo.save(leader);
	}

	public Leader addDislike(UUID id) {
		Leader leader = repo.findById(id).orElseThrow(() -> new NoSuchElementException("Invalid id."));
		leader.addDislike();
		return repo.save(leader);
	}

	public Leader updateAvatar(UUID id, Part avatar) {
		Leader leader = repo.findById(id).orElseThrow(() -> new NoSuchElementException("Invalid id."));

		String savedImg = imgRepo.getBase64FromImage(avatar);
		leader.setAvatar(savedImg);

		return repo.save(leader);
	}
	
	public Leader deleteAvatar(UUID id) {
		Leader leader = repo.findById(id).orElseThrow(() -> new NoSuchElementException("Invalid id."));
		leader.setAvatar(null);
		return repo.save(leader);	
	}

}

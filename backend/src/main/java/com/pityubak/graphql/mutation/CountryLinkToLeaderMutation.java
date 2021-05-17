package com.pityubak.graphql.mutation;

import java.util.NoSuchElementException;
import java.util.Set;

import org.springframework.stereotype.Component;
import com.pityubak.entity.Country;
import com.pityubak.entity.Leader;
import com.pityubak.graphql.input.ToLeaderRelationInput;
import com.pityubak.repository.CountryRepository;
import com.pityubak.repository.LeaderRepository;

import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CountryLinkToLeaderMutation implements GraphQLMutationResolver {

	private final LeaderRepository leaderRepo;
	private final CountryRepository countryRepo;

	public Leader addCountryToLeader(ToLeaderRelationInput input) {
		Leader leader = leaderRepo.findById(input.getLeaderId())
				.orElseThrow(() -> new NoSuchElementException("Invalid id. Leader does not exist."));
		Country country = countryRepo.findById(input.getChildId())
				.orElseThrow(() -> new NoSuchElementException("Invalid id. Country does not exist."));
		
		leader.addCountry(country);
		return leaderRepo.save(leader);
	}

	public Country deleteCountryFromLeader(ToLeaderRelationInput input) {
		Leader leader = leaderRepo.findById(input.getLeaderId())
				.orElseThrow(() -> new NoSuchElementException("Invalid id. Leader does not exist."));
		Country deletedCountry = countryRepo.findById(input.getChildId())
				.orElseThrow(() -> new NoSuchElementException("Invalid id. Country does not exist."));
		Set<Country> countries = leader.getCountries();
		countries.remove(deletedCountry);
		leader.setCountries(countries);
		leaderRepo.save(leader);
		return deletedCountry;
	}

}

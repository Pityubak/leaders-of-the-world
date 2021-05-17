package com.pityubak.graphql.mutation;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Component;
import com.pityubak.entity.Country;
import com.pityubak.error.AlreadyExistException;
import com.pityubak.graphql.input.CreateCountryInput;
import com.pityubak.graphql.input.UpdateCountryInput;
import com.pityubak.repository.CountryRepository;

import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CountryMutations implements GraphQLMutationResolver {

	private final CountryRepository repo;

	public Country createCountry(CreateCountryInput input) {
		Optional<Country> existedCountry = repo.findByFullNameAndShortName(input.getFullName(), input.getShortName());
		if (existedCountry.isPresent()) {
			throw new AlreadyExistException("Country exist.");
		}
		Country newCountry = new Country();
		newCountry.setFullName(input.getFullName());
		newCountry.setShortName(input.getShortName());
		return repo.save(newCountry);
	}

	public Country updateCountry(UpdateCountryInput input) {
		Country updatedCountry = repo.findById(input.getId())
				.orElseThrow(() -> new NoSuchElementException("Invalid id. Cannot update"));
		updatedCountry.setFullName(input.getFullName());
		updatedCountry.setShortName(input.getShortName());
		return repo.save(updatedCountry);
	}

	public Country deleteCountry(UUID id) {
		Country deletedCountry = repo.findById(id)
				.orElseThrow(() -> new NoSuchElementException("Invalid id. Cannot delete"));

		repo.delete(deletedCountry);
		return deletedCountry;
	}
}

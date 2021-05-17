package com.pityubak.graphql.query;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Component;
import com.pityubak.entity.Country;
import com.pityubak.repository.CountryRepository;

import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CountriesQuery implements GraphQLQueryResolver {

	private final CountryRepository repo;

	public Iterable<Country> countries() {
		return repo.findAll();
	}

	public Country countryByShortName(String shortName) {
		return repo.findByShortName(shortName)
				.orElseThrow(() -> new NoSuchElementException("Not found country with this shortname: " + shortName));
	}

	public List<Country> countriesBy(String name) {
		Iterable<Country> countries = repo.findAll();
		List<Country> returnedCountry = new ArrayList<>();
		countries.forEach(ct -> {
			if (ct.getFullName().contains(name) || ct.getShortName().contains(name)) {
				returnedCountry.add(ct);
			}
		});

		return returnedCountry;
	}
}

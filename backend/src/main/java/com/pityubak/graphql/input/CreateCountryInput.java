package com.pityubak.graphql.input;

import lombok.Value;

@Value
public class CreateCountryInput {
	private String fullName;
	private String shortName;
}

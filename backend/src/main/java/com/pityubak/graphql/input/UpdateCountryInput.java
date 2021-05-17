package com.pityubak.graphql.input;

import java.util.UUID;

import lombok.Value;

@Value
public class UpdateCountryInput {
	private UUID id;
	private String fullName;
	private String shortName;
}

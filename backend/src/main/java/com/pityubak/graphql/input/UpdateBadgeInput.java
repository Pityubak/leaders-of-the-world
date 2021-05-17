package com.pityubak.graphql.input;

import java.util.UUID;

import lombok.Value;

@Value
public class UpdateBadgeInput {
	private UUID id;
	private String label;
}

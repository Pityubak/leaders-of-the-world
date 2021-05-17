package com.pityubak.graphql.input;

import java.util.UUID;

import lombok.Value;

@Value
public class UpdateLeaderInput {
	private UUID id;
	private String name;
	private String timeInterval;
	private String description;
}

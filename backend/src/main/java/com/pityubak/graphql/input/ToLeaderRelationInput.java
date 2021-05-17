package com.pityubak.graphql.input;

import java.util.UUID;

import lombok.Value;

@Value
public class ToLeaderRelationInput {
	private UUID leaderId;
	private UUID childId;
}

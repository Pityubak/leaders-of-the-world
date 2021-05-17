package com.pityubak.graphql.input;

import lombok.Value;

@Value
public class CreateLeaderInput {
	private String name;
	private String timeInterval;
	private String description;	

}

package com.pityubak.error;

import java.util.List;

import graphql.ErrorClassification;
import graphql.GraphQLError;
import graphql.language.SourceLocation;

public class AlreadyExistException extends RuntimeException implements GraphQLError {

	/**
	 * 
	 */
	private static final long serialVersionUID = 357989218277297114L;
	
	

	public AlreadyExistException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<SourceLocation> getLocations() {
		return null;
	}

	@Override
	public ErrorClassification getErrorType() {
		return null;
	}

}

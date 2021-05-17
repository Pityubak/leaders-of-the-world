package com.pityubak.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import graphql.kickstart.servlet.apollo.ApolloScalars;
import graphql.schema.GraphQLScalarType;

@Configuration
public class GraphQLConfig {

	  @Bean
	   public GraphQLScalarType uploadScalar() {
	      return ApolloScalars.Upload;
	   } 
}

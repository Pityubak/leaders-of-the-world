package com.pityubak.entity;

import java.util.Set;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.EqualsAndHashCode.Include;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class Country {
	@Id
	@GeneratedValue
	@Include
	private UUID id;
	private String fullName;
	private String shortName;
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "countries")
	private Set<Leader> leaders;
}

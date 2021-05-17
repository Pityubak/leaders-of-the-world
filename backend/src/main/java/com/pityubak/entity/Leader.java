package com.pityubak.entity;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.pityubak.error.AlreadyExistException;

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
@Table(name = "leaders")
public class Leader {

	@Id
	@GeneratedValue
	@Include
	private UUID id;
	private String name;
	@Column(length = 1000)
	private String description;
	private String timeInterval;
	private Long likes = 0L;
	private Long dislikes = 0L;

	@Column(columnDefinition="TEXT")
	private String avatar;

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST })
	@JoinTable(name = "leader_badge", joinColumns = @JoinColumn(name = "leader_id"), inverseJoinColumns = @JoinColumn(name = "badge_id"))
	private Set<Badge> badges = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST })
	@JoinTable(name = "leader_country", joinColumns = @JoinColumn(name = "leader_id"), inverseJoinColumns = @JoinColumn(name = "country_id"))
	private Set<Country> countries = new HashSet<>();

	public void addBadge(Badge badge) {
		if (badges.contains(badge)) {
			throw new AlreadyExistException("Badge exists");
		}
		this.badges.add(badge);
	}

	public void addCountry(Country country) {
		if (countries.contains(country)) {
			throw new AlreadyExistException("Country exists");
		}
		this.countries.add(country);
	}

	public void addLike() {
		this.likes += 1;
	}

	public void addDislike() {
		this.dislikes += 1;
	}
}

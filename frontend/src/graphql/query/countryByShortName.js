import gql from "graphql-tag"

const COUNTRY_BY_SHORT_NAME = gql`
  query CountryByShortName($shortName: String!) {
    countryByShortName(shortName: $shortName) {
      id
      shortName
      fullName
      leaders {
        id
        timeInterval
        description
        avatar
        likes
        dislikes
        name
      }
    }
  }
`

export default COUNTRY_BY_SHORT_NAME

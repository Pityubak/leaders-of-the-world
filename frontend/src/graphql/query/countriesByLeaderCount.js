import gql from "graphql-tag"

const COUNTRIES_BY_LEADERS_COUNT = gql`
  query AllCountries {
    countries {
      id
      shortName
      fullName
      leaders {
        id
      }
    }
  }
`

export default COUNTRIES_BY_LEADERS_COUNT

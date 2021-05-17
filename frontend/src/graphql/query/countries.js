import gql from "graphql-tag"

const ALL_COUNTRIES = gql`
  query AllCountries {
    countries {
      id
      shortName
      fullName
    }
  }
`
export default ALL_COUNTRIES

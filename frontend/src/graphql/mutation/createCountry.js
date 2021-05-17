import gql from "graphql-tag"

const CREATE_COUNTRY = gql`
  mutation CreateCountry($input: CreateCountryInput!) {
    createCountry(input: $input) {
      id
      fullName
    }
  }
`

export default CREATE_COUNTRY

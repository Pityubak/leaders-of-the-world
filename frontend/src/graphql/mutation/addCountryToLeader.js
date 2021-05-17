import gql from "graphql-tag"

const ADD_COUNTRY_TO_LEADER = gql`
  mutation AddCountryToLeader($input: ToLeaderRelationInput!) {
    addCountryToLeader(input: $input) {
      id
      name
    }
  }
`

export default ADD_COUNTRY_TO_LEADER

import gql from "graphql-tag"

const DELETE_COUNTRY_FROM_LEADER = gql`
  mutation DeleteCountryFromLeader($input: ToLeaderRelationInput!) {
    deleteCountryFromLeader(input: $input) {
      id
    }
  }
`

export default DELETE_COUNTRY_FROM_LEADER

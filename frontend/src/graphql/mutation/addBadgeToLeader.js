import gql from "graphql-tag"

const ADD_BADGE_TO_LEADER = gql`
  mutation AddBadgeToLeader($input: ToLeaderRelationInput!) {
    addBadgeToLeader(input: $input) {
      id
    }
  }
`

export default ADD_BADGE_TO_LEADER

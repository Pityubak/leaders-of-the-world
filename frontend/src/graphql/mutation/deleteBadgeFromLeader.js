import gql from "graphql-tag"

const DELETE_BADGE_FROM_LEADER = gql`
  mutation DeleteBadgeFromLeader($input: ToLeaderRelationInput!) {
    deleteBadgeFromLeader(input: $input) {
      id
      label
    }
  }
`

export default DELETE_BADGE_FROM_LEADER

import gql from "graphql-tag"

const UPDATE_LEADER = gql`
  mutation UpdateLeader($input: UpdateLeaderInput!) {
    updateLeader(input: $input) {
      id
      name
    }
  }
`

export default UPDATE_LEADER

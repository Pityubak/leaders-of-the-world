import gql from "graphql-tag"

const CREATE_LEADER = gql`
  mutation CreateLeader($input: CreateLeaderInput!) {
    createLeader(input: $input) {
      id
      name
    }
  }
`

export default CREATE_LEADER

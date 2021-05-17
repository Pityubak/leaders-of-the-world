import gql from "graphql-tag"

const DELETE_LEADER = gql`
  mutation DeleteLeader($id: ID!) {
    deleteLeader(id: $id) {
      id
      name
      countries {
        id
        fullName
      }
    }
  }
`

export default DELETE_LEADER

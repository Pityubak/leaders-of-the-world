import gql from "graphql-tag"

const LIKE = gql`
  mutation AddLike($id: ID!) {
    addLike(id: $id) {
      id
      likes
    }
  }
`

export default LIKE

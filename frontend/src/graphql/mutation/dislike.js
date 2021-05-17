import gql from "graphql-tag"

const DISLIKE = gql`
  mutation AddDisLike($id: ID!) {
    addDislike(id: $id) {
      id
      dislikes
    }
  }
`

export default DISLIKE

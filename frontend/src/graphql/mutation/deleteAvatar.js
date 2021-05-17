import gql from "graphql-tag"

const DELETE_AVATAR = gql`
  mutation DeleteAvatar($id: ID!) {
    deleteAvatar(id: $id) {
      id
    }
  }
`

export default DELETE_AVATAR

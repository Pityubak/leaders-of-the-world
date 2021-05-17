import gql from "graphql-tag"

const ADD_AVATAR = gql`
    mutation UpdateAvatar($id:ID!,$avatar:Upload!){
        updateAvatar(id:$id,avatar:$avatar){
            id
            name
          }
    }
`

export default ADD_AVATAR

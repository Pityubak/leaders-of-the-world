import gql from "graphql-tag"

const CREATE_BADGE = gql`
  mutation CreateBadge($label: String!) {
    createBadge(label: $label) {
      id
    }
  }
`
export default CREATE_BADGE

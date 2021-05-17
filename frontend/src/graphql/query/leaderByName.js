import gql from "graphql-tag"

const LEADER_BY_NAME = gql`
  query LeaderByName($name: String!) {
    leadersBy(name: $name) {
      id
      name
      timeInterval
      description
      avatar
      badges {
        id
        label
      }
      countries {
        id
        shortName
        fullName
      }
    }
  }
`

export default LEADER_BY_NAME

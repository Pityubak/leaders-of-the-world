import { gql } from "@apollo/client"

const LEADERS_WITHOUT_BADGES = gql`
  query AllLeaders {
    leaders {
      id
      name
      timeInterval
      avatar
      countries {
        id
        shortName
        fullName
      }
    }
  }
`

export default LEADERS_WITHOUT_BADGES

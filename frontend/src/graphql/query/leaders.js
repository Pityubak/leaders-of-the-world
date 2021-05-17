import { gql } from "@apollo/client"

const ALL_LEADERS = gql`
  query AllLeaders {
    leaders {
      id
      name
      timeInterval
      countries {
        id
        shortName
        fullName
      }
      badges {
        id
        label
      }
    }
  }
`

export default ALL_LEADERS

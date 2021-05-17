import gql from "graphql-tag"

const ALL_BADGES = gql`
  query AllBadges {
    badges {
      id
      label
    }
  }
`

export default ALL_BADGES

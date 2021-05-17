import fetch from "isomorphic-fetch"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

import { LocalStorageWrapper, persistCache } from "apollo3-cache-persist"
import React, { useEffect, useState } from "react"
import { createUploadLink } from "apollo-upload-client"
import { onError } from "apollo-link-error"
import { ApolloLink } from "@apollo/client/core"
import Loader from "../components/map/loader"

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const Apollo = ({ children }) => {
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

  const httpLink = createUploadLink({
    uri: `https://leaders-of-world.herokuapp.com/graphql`,
  })

  useEffect(() => {
    async function init() {
      const cache = new InMemoryCache({
        typePolicies: {
          addTypeName: true,
        },
      })
      await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
        debug: true,
      })
      setClient(
        new ApolloClient({
          link: ApolloLink.from([errorLink, httpLink]),
          cache: new InMemoryCache({}),
          fetch,
        })
      )
      setLoading(!loading)
    }
    init().catch(console.error)
  }, [])

  return (
    <>
      {loading ? (
        <Loader text="Wait for Heroku to turn on the backend:)" />
      ) : (
        <ApolloProvider client={client}>{children}</ApolloProvider>
      )}
    </>
  )
}

export default Apollo

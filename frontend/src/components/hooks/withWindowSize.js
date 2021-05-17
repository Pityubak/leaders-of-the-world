import React, { Component } from "react"

export default function withWindowSize(WrappedComponent) {
  return class extends Component {
    state = { width: 0, height: 0 }

    componentDidMount() {
      this.updateWindowDimensions()
      if (typeof window !== "undefined")
        window.addEventListener("resize", this.updateWindowDimensions)
    }

    componentWillUnmount() {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", this.updateWindowDimensions)
      }
    }

    updateWindowDimensions = () => {
      if (typeof window !== "undefined") {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          windowWidth={this.state.width}
          windowHeight={this.state.height}
          isMobileSized={this.state.width < 768}
        />
      )
    }
  }
}

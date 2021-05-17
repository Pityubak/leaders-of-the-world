import React, { Component } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import { connect } from "react-redux"
import {
  setActiveCountry,
  setEditPanel,
  updateSeriesData,
} from "../../slices/mapSlice"
import styled from "styled-components"
import { resetActiveStep } from "../../slices/leaderSlice"
import { Grid } from "@material-ui/core"
import { resetForm } from "../../slices/formSlice"
import { ProcessType } from "../../utils/process"

const StyledMap = styled.div`
  width: 80%;
  height: 50vh;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    width: 95%;
  }
`

const StyledGrid = styled(Grid)`
minHeight: 50vh,
marginTop: 3rem,
display: flex,
alignItems: center,
flexDirection: column,
`

class BasicMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chart: null,
      target: null,
      polygonSeries: null,
    }
  }

  subscribeMapEvent() {
    const { polygonSeries, polygonTemplate } = this.props
    polygonTemplate?.events.on(
      "hit",
      function (ev) {
        if (this.state.target) {
          const prevTarget = polygonSeries.getPolygonById(this.state.target)
          prevTarget.isActive = false
        }
        const data = ev.target.dataItem.dataContext
        const target = polygonSeries.getPolygonById(data?.id)
        setTimeout(function () {
          target.isActive = true
        }, 500)

        this.props.dispatch(
          setActiveCountry({
            shortName: data?.id,
            fullName: data?.name,
            isActive: true,
          })
        )
        this.props.dispatch(resetForm())
        this.props.dispatch(resetActiveStep())
        this.props.dispatch(setEditPanel(""))
        this.setState({
          target: data?.id,
        })
      },
      this
    )
  }

  drawMap() {
    const { polygonSeries, polygonTemplate, seriesData } = this.props
    am4core.useTheme(am4themes_animated)
    const chart = am4core.create("chartdiv", am4maps.MapChart)
    chart.geodata = am4geodata_worldLow


    chart.minZoomLevel = 0.9
    chart.zoomLevel = 0.9
    chart.maxZoomLevel = 3.5
    chart.projection = new am4maps.projections.Miller()

    chart.series.push(polygonSeries)
    const hover = polygonTemplate.states.create("hover")
    hover.properties.fill = am4core.color("#C4B67A")
    const activeEffect = polygonTemplate.states.create("active")
    activeEffect.properties.fill = am4core.color("#A30000")

    polygonSeries.data = seriesData

    this.subscribeMapEvent()

    this.setState({
      chart: chart,
      polygonSeries: polygonSeries,
    })
  }

  componentDidMount() {
    this.drawMap()
  }

  componentDidUpdate() {
    if (this.props.refreshMap) {
      const data = []
      this.state.polygonSeries.data.forEach(ct => {
        if (this.props.target.processType === ProcessType.DELETE_ALL) {
          this.props.target.countries?.forEach(country => {
            if (ct?.name === country?.fullName) {
              let counter = ct.length
              counter--
              ct =
                counter > 0
                  ? {
                      id: ct?.id,
                      title: `${country?.fullName} : ${counter} Leader(s)`,
                      fill: am4core.color("#00AFB5"),
                      countryId: country?.id,
                      length: counter,
                    }
                  : {
                      id: ct?.id,
                      title: ct?.name,
                      fill: am4core.color("#212121"),
                    }
            }
          })
        } else {
          if (ct?.name === this.props.target.countryName) {
            let counter = ct.length ? ct.length : 0
            counter =
              this.props.target.processType === ProcessType.ADD
                ? counter + 1
                : counter - 1
            ct =
              counter > 0
                ? {
                    id: ct?.id,
                    title: `${this.props.target.countryName} : ${counter} Leader(s)`,
                    fill: am4core.color("#00AFB5"),
                    countryId: this.props.target.id,
                    length: counter,
                  }
                : {
                    id: ct?.id,
                    title: ct?.name,
                    fill: am4core.color("#212121"),
                  }
          }
        }
        data.push(ct)
      })
      this.state.polygonSeries.data = data
      this.props.dispatch(updateSeriesData())
    }
  }
  componentWillUnmount() {
    if (this.state.chart) {
      this.state.chart.dispose()
    }
  }

  render() {
    return (
      <>
        <StyledMap id="chartdiv" />
        <StyledGrid>{this.props.children}</StyledGrid>
      </>
    )
  }
}

const mapStateToProps = state => ({
  active: state.map.active,
  isEdit: state.map.isEdit,
  refreshMap: state.map.refreshMap,
  target: state.map.target,
})

export default connect(mapStateToProps)(BasicMap)

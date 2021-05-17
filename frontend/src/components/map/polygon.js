import * as am4maps from "@amcharts/amcharts4/maps"
import * as am4core from "@amcharts/amcharts4/core"

export const usePolygon = () => {
  /*  
        Polygonseries config
    */
  const polygonSeries = new am4maps.MapPolygonSeries()
  polygonSeries.exclude = ["AQ"]
  polygonSeries.useGeodata = true

  /*  
        PolygonTemplate config
    */
  const polygonTemplate = polygonSeries.mapPolygons.template

  polygonTemplate.tooltipText = "{name}"
  polygonTemplate.fill = am4core.color("#212121")
  polygonTemplate.propertyFields.fill = "fill"
  polygonTemplate.propertyFields.tooltipText = "title"
  polygonTemplate.polygon.fillOpacity = 0.9

  return {
    polygonSeries,
    polygonTemplate,
  }
}

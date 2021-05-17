import "./src/pages/index.css"

import * as am4core from "@amcharts/amcharts4/core"
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"

am4core.useTheme(am4themes_spiritedaway)
am4core.useTheme(am4themes_animated)

export { ThemeWrapper as wrapRootElement } from "./src/theme/theme"

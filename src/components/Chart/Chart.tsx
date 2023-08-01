'use client'
import React, { CSSProperties, useEffect, useRef } from 'react'

import { CanvasRenderer } from 'echarts/renderers'

import { init, getInstanceByDom, use } from 'echarts/core'

import { LineChart } from 'echarts/charts'

import {
	TitleComponent,
	GridComponent,
	TooltipComponent,
	LegendComponent,
} from 'echarts/components'

import type { ECharts, ComposeOption, SetOptionOpts } from 'echarts/core'

import type {
	BarSeriesOption,
	LineSeriesOption,
	ScatterSeriesOption,
} from 'echarts/charts'
import type {
	TitleComponentOption,
	GridComponentOption,
} from 'echarts/components'

use([
	LegendComponent,
	GridComponent,
	TitleComponent,
	TooltipComponent,
	CanvasRenderer,
	LineChart,
])

export type EChartsOption = ComposeOption<
	| BarSeriesOption
	| LineSeriesOption
	| TitleComponentOption
	| GridComponentOption
	| ScatterSeriesOption
>

interface ChartProps {
	option: EChartsOption
	style?: CSSProperties
	settings?: SetOptionOpts
	loading?: boolean
	theme?: 'light' | 'dark'
}

const Chart: React.FC<ChartProps> = ({
	option,
	style,
	settings,
	loading,
	theme,
}) => {
	const chartRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		let chart: ECharts | undefined
		if (chartRef.current !== null) {
			chart = init(chartRef.current, theme)
		}

		const resizeChart = () => {
			chart?.resize()
		}

		window.addEventListener('resize', resizeChart)

		return () => {
			chart?.dispose()
			window.removeEventListener('resize', resizeChart)
		}
	}, [theme])

	useEffect(() => {
		if (chartRef.current !== null) {
			const chart = getInstanceByDom(chartRef.current)
			if (chart) chart.setOption(option, settings)
		}
	}, [option, settings, theme])
	useEffect(() => {
		if (chartRef.current !== null) {
			const chart = getInstanceByDom(chartRef.current)
			if (chart) loading === true ? chart.showLoading() : chart.hideLoading()
		}
	}, [loading, theme])

	return <div ref={chartRef} style={{ ...style }}></div>
}

export default Chart

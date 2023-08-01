'use client'
import React, { useState } from 'react'
import Chart, { EChartsOption } from './Chart'
import { CryptoState } from '@/utils/CryptoContext'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { HistoricalChart } from '@/utils/endpoints'
import Loader from '../Loader'
import { chartDays } from '@/utils/ChartDays'

const MyChart = ({ id }: { id: string }) => {
	const { currency } = CryptoState()

	const [days, setDays] = useState(1)

	const fetchData = async () => {
		const { data } = await axios.get(HistoricalChart(id, days, currency))
		return data.prices
	}

	const { data, isLoading } = useQuery({
		queryKey: ['historicData', currency, days],
		queryFn: fetchData,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	})

	if (isLoading) return ''

	return (
		<div className='w-full md:w-2/3 flex flex-col'>
			<Chart
				key={days}
				option={
					{
						legend: {
							data: [`Price (Past ${days} Days) in ${currency}`],
							textStyle: { color: '#f3f3f3', fontSize: '14px' },
						},
						xAxis: {
							type: 'category',
							axisLabel: {
								rotate: 45,
							},
							data: data.map((coin: any) => {
								let date = new Date(coin[0])
								let time = `${date.getHours()}:${date.getMinutes()}`

								return days === 1 ? time : date.toLocaleDateString()
							}),
						},
						yAxis: {
							type: 'value',
						},
						series: [
							{
								name: `Price (Past ${days} Days) in ${currency}`,
								data: data.map((coin: any) => coin[1]),
								type: 'line',
								symbolSize: 2,
							},
						],
						tooltip: {
							trigger: 'item',
							confine: true,
						},
						animationDuration: 2000,
						animationEasing: 'easeOut',
					} as EChartsOption
				}
				style={{ width: '100%', height: '500px' }}
			/>
			<div className='flex justify-around px-14 space-x-5'>
				{chartDays.map((item) => (
					<button
						key={item.name}
						type='button'
						className={`text-left  border w-1/4 border-yellow-400  hover:bg-yellow-500 font-bold rounded-md text-sm px-5 py-2 mr-2 mb-2 ${
							days === item.value
								? 'bg-yellow-400 text-black'
								: 'bg-transparent text-white'
						}`}
						onClick={() => setDays(() => item.value)}
					>
						{item.name}
					</button>
				))}
			</div>
		</div>
	)
}

export default MyChart

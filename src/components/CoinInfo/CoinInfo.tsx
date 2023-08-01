'use client'
import React from 'react'
import { SingleCoin } from '@/utils/endpoints'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import Loader from '../Loader'
import parse from 'html-react-parser'
import { CryptoState } from '@/utils/CryptoContext'
import numberWithCommas from '@/utils/numberWithCommas'

const CoinInfo = ({ id }: { id: string }) => {
	const { currency, symbol } = CryptoState()

	const fetchData = async () => {
		const { data } = await axios.get(SingleCoin(id))
		return data
	}

	const { data, isLoading } = useQuery({
		queryKey: ['coin', id],
		queryFn: fetchData,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	})

	if (isLoading)
		return (
			<div className='w-full'>
				<Loader />
			</div>
		)

	return (
		<div className='w-full p-6 md:w-1/3 md:border-r-2 flex flex-col space-y-5 '>
			<Image
				src={data.image.large}
				alt={data.symbol}
				height={200}
				width={200}
				className='h-[200px] w-[200px] mx-auto'
			/>
			<h1 className='text-4xl lg:text-5xl font-bold text-center'>
				{data.name}
			</h1>
			<p className='text-lg'>{parse(data.description.en.split('. ')[0])}</p>
			<div className='text-xl'>
				<h5>
					<span className='text-2xl font-bold'>Rank: </span>{' '}
					{data.market_cap_rank}
				</h5>
				<h5>
					<span className='text-2xl font-bold'>Current Price: </span> {symbol}
					{numberWithCommas(
						data.market_data.current_price[currency.toLowerCase()],
					)}
				</h5>
				<h5>
					<span className='text-2xl font-bold'>Market Cap: </span> {symbol}
					{numberWithCommas(
						data.market_data.market_cap[currency.toLowerCase()],
					).slice(0, -6)}
					M
				</h5>
			</div>
		</div>
	)
}

export default CoinInfo

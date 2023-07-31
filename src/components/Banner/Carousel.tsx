'use client'
import { CryptoState } from '@/utils/CryptoContext'
import { TrendingCoins } from '@/utils/endpoints'
import { TRENDING } from '@/utils/mock'
import numberWithCommas from '@/utils/numberWithCommas'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

const Carousel = () => {
	const { currency, symbol } = CryptoState()

	const fetchData = async () => {
		const { data } = await axios.get(TrendingCoins(currency))
		return data
	}

	const { data } = useQuery({
		queryKey: ['trending', currency],
		queryFn: fetchData,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	})

	console.log(data)

	// const [trending, setTrending] = useState(TRENDING)

	// const [trending, setTrending] = useState<any[]>()

	// useEffect(() => {
	// 	fetchData()
	// }, [currency])

	let items
	if (data) {
		items = data.map((coin: any) => {
			const profit = coin.price_change_percentage_24h >= 0
			return (
				<Link
					key={coin.id}
					href={`/coins/${coin.id}`}
					className='flex flex-col space-y-1'
				>
					<Image
						alt={coin.name}
						src={coin.image}
						width={80}
						height={80}
						className=' mb-10 mx-auto h-[80px] w-[80px]'
					/>
					<span className='text-center uppercase '>
						{coin.symbol}
						<span className={`${profit ? 'text-green-600' : 'text-red-600'}`}>
							{profit ? ' +' : ' '}
							{coin?.price_change_percentage_24h?.toFixed(2)}%
						</span>
					</span>
					<span className='text-center text-2xl font-bold text-yellow-400'>
						{symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
					</span>
				</Link>
			)
		})
	}

	const responsive = {
		0: {
			items: 2,
		},
		512: {
			items: 4,
		},
	}

	return (
		<div className='flex h-[50%] items-center justify-center'>
			{items && (
				<AliceCarousel
					mouseTracking
					infinite
					autoPlayInterval={1000}
					animationDuration={1500}
					disableDotsControls
					disableButtonsControls
					responsive={responsive}
					autoPlay
					swipeExtraPadding={100}
					items={items}
				/>
			)}
		</div>
	)
}

export default Carousel

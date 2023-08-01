'use client'
import { CryptoState } from '@/utils/CryptoContext'
import { CoinList } from '@/utils/endpoints'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Loader from '../Loader'
import numberWithCommas from '@/utils/numberWithCommas'
import Link from 'next/link'
import Pagination from '../Pagination/Pagination'

const CoinsTable = () => {
	const { currency, symbol } = CryptoState()

	const [page, setPage] = useState(1)

	const fetchData = async () => {
		const { data } = await axios.get(CoinList(currency))
		return data
	}

	const [search, setSearch] = useState('')

	const { data, isLoading } = useQuery({
		queryKey: ['coins', currency],
		queryFn: fetchData,
		// keepPreviousData: true,
		refetchOnWindowFocus: false,
	})

	const handleSearch = () => {
		return data.filter(
			(coin: any) =>
				coin.name.toLowerCase().includes(search.toLowerCase()) ||
				coin.symbol.toLowerCase().includes(search.toLowerCase()),
		)
	}

	if (isLoading) return <Loader />

	return (
		<section className='container flex flex-col space-y-5 text-center px-10'>
			<h2 className='text-3xl font-bold mt-10'>
				Cryptocurrency Prices by Market Cap
			</h2>

			<div className='relative'>
				<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
					<svg
						className='w-4 h-4 text-gray-200'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 20 20'
					>
						<path
							stroke='currentColor'
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
						/>
					</svg>
				</div>
				<input
					type='search'
					className='block w-full p-4 pl-10 text-sm  border rounded-lg  bg-gray-900 border-gray-200 placeholder-gray-400
					 text-white'
					placeholder='Search For a Crypto Currency'
					value={search}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setSearch(e.target.value)
					}}
				/>
			</div>

			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<table className='w-full text-sm text-left text-gray-400 '>
					<thead className='text-lg font-bold bg-yellow-400 text-black'>
						<tr>
							{['Coin', 'Price', '24h Change', 'Market Cap', 'Action'].map(
								(title) => (
									<th key='title' scope='col' className=' px-6 py-4 '>
										{title}
									</th>
								),
							)}
						</tr>
					</thead>

					<tbody>
						{handleSearch()
							.slice((page - 1) * 10, page * 10)
							.map((coin: any) => {
								const profit = coin.price_change_percentage_24h >= 0

								return (
									<tr
										key={coin.name}
										className='border-b bg-gray-900 border-gray-700'
									>
										<td className='px-6 py-3 flex space-x-5'>
											<Image
												alt={coin.name}
												src={coin.image}
												width={50}
												height={50}
												className='h-[50px] w-[50px]'
											/>
											<div className='flex flex-col'>
												<span className='uppercase text-xl text-white'>
													{coin.symbol}
												</span>
												<span className='text-sm'>{coin.name}</span>
											</div>
										</td>
										<td className='px-6 py-3'>
											{symbol}{' '}
											{numberWithCommas(coin?.current_price.toFixed(2))}
										</td>
										<td
											className={`${
												profit ? 'text-green-600' : 'text-red-600'
											} px-6 py-3`}
										>
											{profit ? ' +' : ' '}
											{coin?.price_change_percentage_24h?.toFixed(2)}%
										</td>
										<td className='px-6 py-3'>
											{coin.market_cap.toString().slice(0, -6)}M
										</td>
										<td className='px-6 py-3'>
											<Link
												href={`/coins/${coin.id}`}
												className='font-medium text-blue-500 hover:underline'
											>
												Details
											</Link>
										</td>
									</tr>
								)
							})}
					</tbody>
				</table>
			</div>
			<div className='mx-auto pb-4'>
				<Pagination
					count={handleSearch()?.length / 10}
					currentPage={page}
					handleClick={setPage}
				/>
			</div>
		</section>
	)
}

export default CoinsTable

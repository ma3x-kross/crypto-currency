'use client'
import { CryptoState } from '@/utils/CryptoContext'
import Link from 'next/link'
import React, { ChangeEvent } from 'react'

const Header = () => {
	const { currency, setCurrency, symbol, setSymbol } = CryptoState()

	return (
		<header>
			<div className='container mx-auto mt-6 bg-gray-800 flex justify-between py-4 align-middle shadow-xl rounded-xl shadow-gray-900  px-10'>
				<Link
					href='/'
					className='font-bold text-3xl leading-normal text-gray-200'
				>
					CRYPTO
				</Link>
				<select
					className='bg-gray-800 block px-2.5 cursor-pointer text-sm font-semibold text-gray-200 rounded-lg border border-gray-200'
					name='currency'
					id='currency'
					value={currency}
					onChange={(e: ChangeEvent<HTMLSelectElement>) =>
						setCurrency(e.target.value)
					}
				>
					<option value='USD'>USD</option>
					<option value='RUB'>RUB</option>
				</select>
			</div>
		</header>
	)
}

export default Header


import MyChart from '@/components/Chart/MyChart'
import CoinInfo from '@/components/CoinInfo/CoinInfo'
import React from 'react'

const CoinPage = ({ params }: { params: { id: string } }) => {
	


	return (
		<div className='flex flex-wrap p-5'>
			{/* content */}
			<CoinInfo id={params.id} />
			{/* charts */}
			<MyChart id={params.id} />
		</div>
	)
}

export default CoinPage

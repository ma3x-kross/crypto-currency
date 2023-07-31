import React from 'react'
import BannerImg from '@/../public/banner.jpg'
import Image from 'next/image'
import Carousel from './Carousel'

const Banner = () => {
	return (
		<main className='container mx-auto relative h-[400px] flex flex-col mt-6  justify-around'>
			<Image
				src={BannerImg}
				alt='background'
				placeholder='blur'
				quality={100}
				fill
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				style={{
					objectFit: 'cover',
					zIndex: '-1',
				}}
			/>
			<div className='flex flex-col space-y-3 text-center  pt-10 h-[40%]'>
				<h1 className='font-bold text-5xl '>Crypto Currency</h1>
				<p className='text-xl '>
					Get all the info regarding your favorite Crypto Currency
				</p>
			</div>
			<Carousel />
		</main>
	)
}

export default Banner

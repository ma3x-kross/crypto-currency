'use client'
import React, { Dispatch, SetStateAction } from 'react'

interface PaginationProps {
	count: number
	currentPage: number
	handleClick: Dispatch<SetStateAction<number>>
}

const Pagination: React.FC<PaginationProps> = ({
	count,
	currentPage,
	handleClick,
}) => {
	const paginateItem = (num: number) => {
		return (
			<li
				key={num}
				className={`${
					num === currentPage ? 'pagination-item-active' : 'pagination-item'
				}`}
				onClick={() => handleClick(num)}
			>
				{num}
			</li>
		)
	}

	const dottedItem = () => (
		<li className='pagination-item pointer-events-none'>...</li>
	)

	return (
		<div className='text-center'>
			<ul className='flex items-center -space-x-px h-10 text-base'>
				<li
					className={`${
						currentPage === 1 ? 'pointer-events-none opacity-60' : ''
					} pagination-item rounded-l-lg`}
					onClick={() => handleClick(currentPage - 1)}
				>
					<span className='sr-only'>Previous</span>
					<svg
						className='w-3 h-3'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 6 10'
					>
						<path
							stroke='currentColor'
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='M5 1 1 5l4 4'
						/>
					</svg>
				</li>
				{currentPage < 5 ? (
					<>
						{Array.from({ length: count })
							.slice(currentPage, currentPage + 5)
							.map((_, idx) => paginateItem(idx + 1))}
						{dottedItem()}
						{paginateItem(count)}
					</>
				) : count - currentPage < 4 ? (
					<>
						{paginateItem(1)}
						{dottedItem()}
						{Array.from({ length: count }).map((_, idx) => {
							if (idx < count - 5) return
							return paginateItem(idx + 1)
						})}
					</>
				) : (
					<>
						{paginateItem(1)}
						{dottedItem()}
						{Array.from({ length: 3 }).map((_, idx) =>
							paginateItem(currentPage - 1 + idx),
						)}

						{dottedItem()}
						{paginateItem(count)}
					</>
				)}
				<li
					className={`${
						currentPage === count ? 'pointer-events-none opacity-60' : ''
					} pagination-item rounded-r-lg`}
					onClick={() => handleClick(currentPage + 1)}
				>
					<span className='sr-only'>Next</span>
					<svg
						className='w-3 h-3'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 6 10'
					>
						<path
							stroke='currentColor'
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='m1 9 4-4-4-4'
						/>
					</svg>
				</li>
			</ul>
		</div>
	)
}

export default Pagination

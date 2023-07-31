'use client'
import React from 'react'

interface PaginationProps {
	count: number
	currentPage: number
	onChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ count, currentPage }) => {
	return (
		<div className='text-center'>
			<ul className='flex items-center -space-x-px h-10 text-base'>
				<li>
					<a href='#' className='pagination-item rounded-l-lg'>
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
					</a>
				</li>
				{currentPage < 5 ? (
					<>
						{Array.from({ length: count })
							.slice(currentPage, currentPage + 5)
							.map((_, idx) => (
								<li key={idx}>
									<a
										href='#'
										className={`${
											idx + 1 === currentPage
												? 'pagination-item-active'
												: 'pagination-item'
										}`}
									>
										{idx + 1}
									</a>
								</li>
							))}

						<li>
							<a href='#' className='pagination-item pointer-events-none'>
								...
							</a>
						</li>
						<li>
							<a
								href='#'
								className={`${
									count === currentPage
										? 'pagination-item-active'
										: 'pagination-item'
								}`}
							>
								{count}
							</a>
						</li>
					</>
				) : count - currentPage < 4 ? (
					<>
						<li>
							<a
								href='#'
								className={`${
									currentPage === 1
										? 'pagination-item-active'
										: 'pagination-item'
								}`}
							>
								1
							</a>
						</li>

						<li>
							<a href='#' className='pagination-item pointer-events-none'>
								...
							</a>
						</li>
						{Array.from({ length: count }).map((_, idx) => {
							if (idx < count - 5) return
							return (
								<li key={idx}>
									<a
										href='#'
										className={`${
											idx + 1 === currentPage
												? 'pagination-item-active'
												: 'pagination-item'
										}`}
									>
										{idx + 1}
									</a>
								</li>
							)
						})}
					</>
				) : (
					<>
						<li>
							<a
								href='#'
								className={`${
									currentPage === 1
										? 'pagination-item-active'
										: 'pagination-item'
								}`}
							>
								1
							</a>
						</li>

						<li>
							<a href='#' className='pagination-item pointer-events-none'>
								...
							</a>
						</li>
						{Array.from({ length: 3 }).map((_, idx) => (
							<li key={idx}>
								<a
									href='#'
									className={`${
										currentPage === currentPage - 1 + idx
											? 'pagination-item-active'
											: 'pagination-item'
									}`}
								>
									{currentPage - 1 + idx}
								</a>
							</li>
						))}

						<li>
							<a href='#' className='pagination-item pointer-events-none'>
								...
							</a>
						</li>
						<li>
							<a
								href='#'
								className={`${
									count === currentPage
										? 'pagination-item-active'
										: 'pagination-item'
								}`}
							>
								{count}
							</a>
						</li>
					</>
				)}
				<li>
					<a href='#' className='pagination-item rounded-r-lg'>
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
					</a>
				</li>
			</ul>
		</div>
	)
}

export default Pagination

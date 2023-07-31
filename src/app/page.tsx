import Banner from '@/components/Banner/Banner'
import CoinsTable from '@/components/CoinsTable/CoinsTable'
import Header from '@/components/Header/Header'
import Pagination from '@/components/Pagination/Pagination'
import Image from 'next/image'

export default function Home() {
	return (
		<>
			<Pagination count={10} currentPage={5} />
			{/* <Banner />
			<CoinsTable /> */}
		</>
	)
}

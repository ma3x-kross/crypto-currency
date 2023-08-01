import Banner from '@/components/Banner/Banner'
import CoinsTable from '@/components/CoinsTable/CoinsTable'
import Header from '@/components/Header/Header'
import Pagination from '@/components/Pagination/Pagination'
import Image from 'next/image'

export default function Home() {
	return (
		<>
			<Banner />
			<CoinsTable />
		</>
	)
}

'use client'
import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

interface State {
	currency: string
	setCurrency: Dispatch<SetStateAction<string>>
	symbol: string
	setSymbol: Dispatch<SetStateAction<string>>
}

export const Crypto = createContext<State>({} as State)

interface CryptoContextProps {
	children: ReactNode
}

const CryptoContext: React.FC<CryptoContextProps> = ({ children }) => {
	const [currency, setCurrency] = useState('USD')
	const [symbol, setSymbol] = useState('$')

	useEffect(() => {
		currency === 'USD' ? setSymbol('$') : setSymbol('₽')
	}, [currency])

	return (
		<Crypto.Provider value={{ currency, setCurrency, symbol, setSymbol }}>
			{children}
		</Crypto.Provider>
	)
}

export const CryptoState = () => {
	const { currency, setCurrency, symbol, setSymbol } = useContext(Crypto)
	return { currency, setCurrency, symbol, setSymbol }
}

export default CryptoContext

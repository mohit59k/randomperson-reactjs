import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import {
	FaEnvelopeOpen,
	FaUser,
	FaCalendarTimes,
	FaMap,
	FaPhone,
	FaLock,
} from 'react-icons/fa'
function App() {
	const url = 'https://randomuser.me/api/'
	const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
	const [name, setName] = useState('Random Name')
	const [defImg, setDefImg] = useState(defaultImage)
	const [btnClick, setBtnClick] = useState(0)
	const [title, setTitle] = useState('name')
	const [apiData, setApiData] = useState()
	const getData = async () => {
		const resp = await fetch(url)
		const data = await resp.json()
		const actData = data.results[0]
		setApiData(actData)
		const {
			picture: { large: personImg },
			name: { first: firstName, last: lastName },
		} = actData
		setTitle('name')
		setDefImg(personImg)
		setName(`${firstName} ${lastName}`)
	}
	const apiDataVal = () => {
		if (apiData) {
			const {
				picture: { large: personImg },
				name: { first: firstName, last: lastName },
				dob: { age },
				email,
				cell,
				location: { state, country },
				login: { password },
			} = apiData
			setDefImg(personImg)
			if (title === 'name') {
				setName(`${firstName} ${lastName}`)
			}
			if (title === 'mail') {
				setName(email)
			}
			if (title === 'age') {
				setName(age)
			}
			if (title === 'phone') {
				setName(cell)
			}
			if (title === 'loc') {
				setName(`${state},${country}`)
			}
			if (title === 'pass') {
				setName(password)
			}
		}
	}
	useEffect(() => {
		getData()
	}, [btnClick])
	useEffect(() => {
		apiDataVal()
	}, [title])
	const handleMouseOver = (e) => {
		const titleVal = e.target.dataset.label
		setTitle(titleVal)
	}
	return (
		<main>
			<div className='block bcg-black'></div>
			<div className='block'>
				<div className='container'>
					<img src={defImg} alt='' className='user-img' />
					<p className='user-title'>my {title} is</p>
					<p className='user-value'>{name}</p>
					<div className='values-list'>
						<button
							className='icon'
							data-label='name'
							onMouseEnter={handleMouseOver}
						>
							<FaUser />
						</button>
						<button
							className='icon'
							data-label='mail'
							onMouseEnter={handleMouseOver}
						>
							<FaEnvelopeOpen />
						</button>
						<button
							className='icon'
							data-label='age'
							onMouseEnter={handleMouseOver}
						>
							<FaCalendarTimes />
						</button>
						<button
							className='icon'
							data-label='phone'
							onMouseEnter={handleMouseOver}
						>
							<FaPhone />
						</button>
						<button
							className='icon'
							data-label='loc'
							onMouseEnter={handleMouseOver}
						>
							<FaMap />
						</button>
						<button
							className='icon'
							data-label='pass'
							onMouseEnter={handleMouseOver}
						>
							<FaLock />
						</button>
					</div>
					<button
						className='btn'
						onClick={() => {
							setBtnClick(btnClick + 1)
						}}
					>
						Click to get Random Person
					</button>
				</div>
			</div>
		</main>
	)
}

export default App

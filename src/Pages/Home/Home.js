import React, {useState} from 'react'
import styles from './Home.module.css'
import Card from '../../Components/UI/Card/Card'
import Modal from '@material-ui/core/Modal'
import NavBar from '../../Components/UI/NavBar/NavBar'
import Loader from '../../Components/UI/Loader/Loader'
import Result from '../../Components/UI/Result/Result'
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

// import Loader from ''


const Home = () => {
	const [modalOpen, setModalOpen] = useState(false)
	const [timeUnit, setTimeUnit] = useState()
	const [timeBlock, setTImeBlock] = useState("Mins")
	const [menuOpen, setMenuOpen] = useState(false)
	const [btnDisabled, setBtnDisabled] = useState(false)
	const [showLoader, setShowLoader] = useState(false)
	const [recieved, setRecieved] = useState(false)
	const [modalDetails, setModalDetails] = useState({
		name: "",
		image:"",
		location: "",
		code: ""
	})
	const [mode, setMode] = useState('arrival')
	const [results, setResult] = useState([])
	const [timeSecs, setTimeSecs] = useState(0)
	const CURRENT_TIME_IN_SECS = Math.round(new Date().getTime()) / 1000
	let content = null

	const Timesetter = (time) => {
		// get the current time and calculate the epoch / unix time
		let timeDifference = 0
		if(timeBlock == "Mins"){
			timeDifference = (time * 60)
		}else if(timeBlock == "Hrs"){
			timeDifference = (time * 60 * 60)
		}else{
			timeDifference = (time * 60 * 60 * 24)
		}
		setTimeSecs(CURRENT_TIME_IN_SECS - timeDifference)		
		if (timeDifference > 518400){
			setBtnDisabled(true)
		}
	}


	const cities = [
		{
			id: 1,
			name: "Hartsfield-Jackson Altlanta international airport",
			Location: "Atlanta, Georgia",
			image: "https://images.unsplash.com/photo-1504983376254-592a0ea9b0cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=891&q=80",
			code: "KATL"
		},
		{
			id: 2,
			name: "O'Hare international	airport",
			Location: "chicago, illinois",
			image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=813&q=80",
			code: "KORD"
		},
		{
			id: 3,
			name: "Los Angeles international airport",
			Location: "California",
			image: "https://images.unsplash.com/photo-1512746133319-6559ec0c1f39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=786&q=80",
			code: "KLAX"
		},
		{
			id: 4,
			name: "Dallas/Fort Worth international airport",
			Location: "Dallas, Texas",
			image: "https://images.unsplash.com/photo-1542482780641-7f549ee20bc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
			code: "KDFW"
		},
		{
			id: 5,
			name: "John F Kennedy international	airport",
			Location: "New York",
			image: "https://images.unsplash.com/photo-1532960401447-7dd05bef20b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=379&q=80",
			code: "KJFK"
		},
		{
			id: 6,
			name: "Denver international	airport",
			Location: "Denver, colorado",
			image: "https://images.unsplash.com/photo-1507070989769-45210775a437?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=605&q=80",
			code: "KDEN"
		},
		{
			id: 7,
			name: "San Francisco international airport",
			Location: "California",
			image: "https://images.unsplash.com/photo-1461696114087-397271a7aedc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
			code: "KSFO"
		},
		{
			id: 8,
			name: "McCarran international airport	",
			Location: "Las Vegas, Nevada",
			image: "https://images.unsplash.com/photo-1516975698824-571e2c952dbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
			code: "KLAS"
		},
		{
			id: 9,
			name: "Pheonix Sky Harbour international airport",
			Location: "Phoenix Arizona",
			image: "https://images.unsplash.com/photo-1437153225860-b850e2a4d0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
			code: "KPHX"
		},
		{
			id: 10,
			name: "Goerge Bush intercontinental airport",
			Location: "Houston, Texas",
			image: "https://images.unsplash.com/photo-1470082719408-b2843ab5c9ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=891&q=80",
			code: "KIAH"
		},
	]

	const getFlightdetails = () => {
		console.log(CURRENT_TIME_IN_SECS)
		console.log(timeSecs)
		setShowLoader(true)
		let url = `https://opensky-network.org/api/flights/${mode}?airport=${modalDetails.code}&begin=${parseInt(timeSecs)}&end=${parseInt(CURRENT_TIME_IN_SECS)}`
		fetch(url)
		.then(res => res.json())
		.then(data => {
			setShowLoader(false)
			setRecieved(true)
			if (data.length > 20){
				setResult([...data.slice(0, 21)])
			}else{
				setResult([...data])
			}
		})
		.catch(error => console.log(error))
	}

	if (showLoader){
		content = (<div className={styles.LoaderContainer}><Loader/></div>)
	}else{
		if (recieved && results.length == 0){
			content = (<h5 className={styles.warning}>No results rerurned, try a larger time interval</h5>)
		}else{
			content = results.map(({icao24, callsign, estDepartureAirport, estArrivalAirport }) => <Result 
				icao24={icao24}
				callsign={callsign}
				estDepartureAirport={estDepartureAirport}
				estArrivalAirport={estArrivalAirport}
			 />)
			}
	}


	if(btnDisabled){
		let maxTime = 0
		if(timeBlock == "Mins"){
			maxTime = 8640
		}else if(timeBlock == "Hrs"){
			maxTime = 144
		}else{
			maxTime = 6
		}
		content = (<p>Maximum time interval allowed is {maxTime} {timeBlock} </p>)
	}


	const open = (idnumber) => {
		const extractedArr = cities.filter(({ id }) => id == idnumber )
		setModalDetails(extractedArr[0]) 
		setModalOpen(true)
	}
	const close = () => {
		setModalOpen(false)
		setTimeUnit(0)
		setTImeBlock("Mins")
		setResult([])
	}
	

	const cardList = cities.map(city => <Card {...city} clickFunc={() => open(city.id)} />)
	return (
		<div className={styles.Homepage}>
			<NavBar/>
			{/*modal*/}
			<Modal
	        aria-labelledby="simple-modal-title"
	        aria-describedby="simple-modal-description"
	        open={modalOpen}
	        onClose={close}
	        className={styles.modal}
      		>
		        <div className={styles.ModalMain}>
					<div className={styles.imageHolder}>
						<img src={modalDetails.image} alt=""/>
						<h2>{modalDetails.name}</h2>
						<span className={styles.location}>{modalDetails.Location}</span>
					</div>
						<div className={styles.mainContainer}>
							<div className={styles.mainContainerHeader}>
								<div className={(mode == "arrival") ? [styles.HeaderBox, styles.active].join(' ') : styles.HeaderBox} onClick={() => {
									setTimeUnit(0)
									setResult([])
									setMode('arrival')}}>Arrivals</div>
								<div className={(mode == "departure") ? [styles.HeaderBox, styles.active].join(' ') :  styles.HeaderBox} onClick={() => {
									setTimeUnit(0)
									setResult([])
									setMode('departure')}}>Departures</div>
							</div>
							<div className={styles.actionBar}>
								<div className="inputbox">
								<input type="number" value={timeUnit} min='0' onChange={(e) => {
									setBtnDisabled(false)
									setTimeUnit(e.target.value)
									Timesetter(e.target.value)
									setRecieved(false)
								}} className={styles.input}/>
						    
								<Select
									labelId="demo-controlled-open-select-label"
									id="demo-controlled-open-select"
									open={menuOpen}
									onClose={() => setMenuOpen(false)}
									onOpen={() => setMenuOpen(true)}
									value={timeBlock}
									onChange={(e) => {
										setTImeBlock(e.target.value)
										setTimeUnit(0)
									 }}
									className={styles.Select}
								>
									<MenuItem value="Mins">Mins</MenuItem>
									<MenuItem value="Hrs">Hrs</MenuItem>
									<MenuItem value="Days">Days</MenuItem>
								</Select>
								</div>
								
								<Button disabled={btnDisabled} onClick={() => {
									getFlightdetails()
								}} variant="contained" color="primary" size="medium" className={styles.button}>
      					  			Search
      							</Button>
							</div>
							<div className={styles.mainContent}>
								{(timeUnit > 0) ? content : <h1 className={styles.warning}>Input number of {timeBlock}</h1> }				
							</div>
						</div>

		        </div>
      	</Modal>

			<div className={styles.gridContainer}>
				{cardList}
			</div>
		</div>
	)
}

export default Home 

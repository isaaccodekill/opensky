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
import cities from '../../Utils/cities'



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

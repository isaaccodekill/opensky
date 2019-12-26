import React, {useState} from 'react'
import styles from './Modal.module.css'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Loader from '../../Components/UI/Loader/Loader'
import Result from '../../Components/UI/Result/Result'

const ModalBox = ({modalOpen, setModalOpen, modalDetails}) => {


    // state
    const [timeUnit, setTimeUnit] = useState()
	const [timeBlock, setTImeBlock] = useState("Mins")
	const [menuOpen, setMenuOpen] = useState(false)
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [showLoader, setShowLoader] = useState(false)
    const [recieved, setRecieved] = useState(false)
    const [mode, setMode] = useState('arrival')
	const [results, setResult] = useState([])
	const [timeSecs, setTimeSecs] = useState(0)
	const CURRENT_TIME_IN_SECS = Math.round(new Date().getTime()  / 1000 )
	let content = null

    const Timesetter = (time) => {
		if(time < 1){
			setBtnDisabled(true)
		}
		let timeDifference = 0
		if(timeBlock === "Mins"){
			timeDifference = (time * 60)
		}else if(timeBlock === "Hrs"){
			timeDifference = (time * 60 * 60)
		}else{
			timeDifference = (time * 60 * 60 * 24)
		}

		// set the start time in epoch time
		setTimeSecs(CURRENT_TIME_IN_SECS - timeDifference)		

		// to check if the difference between the start time and the end time is more than 6 days
		if (timeDifference > 518400){
			setBtnDisabled(true)
		}
	}


	// get arrivals or depatures from the open sky api
	const getFlightdetails = () => {
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


	// determine what get shown in the content section - before, during and after api call is made
	if (showLoader){
		content = (<div className={styles.LoaderContainer}><Loader/></div>)
	}else{
		if (recieved && results.length === 0){
			content = (<h5 className={styles.warning}>No results rerurned, try a larger time interval</h5>)
		}else{
			content = results.map(({icao24, callsign, estDepartureAirport, estArrivalAirport, firstSeen, lastSeen }) => <Result 
				icao24={icao24}
				callsign={callsign}
				estDepartureAirport={estDepartureAirport}
				estArrivalAirport={estArrivalAirport}
				departureTime={firstSeen}
				estimatedArrivalTime={lastSeen}
			 />)
			}
	}


	//determine the error message to show when user exceeds the time range 
	if(btnDisabled){
		let maxTime = 0
		if(timeBlock === "Mins"){
			maxTime = 8640
		}else if(timeBlock === "Hrs"){
			maxTime = 144
		}else{
			maxTime = 6
		}
		content = (<p>Maximum time interval allowed is {maxTime} {timeBlock} </p>)
	}

	
	// perform a reset of timeinput and result variables
	const reset = () => {
		setTimeUnit(0)
		setResult([])
		setTImeBlock("Mins")
	}


	// functions to open and close the modal
	const close = () => {
		setModalOpen(false)
		reset()
	}


    return (
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
								<div className={(mode === "arrival") ? [styles.HeaderBox, styles.active].join(' ') : styles.HeaderBox} onClick={() => {
									reset()
									setMode('arrival')}}>Arrivals</div>
								<div className={(mode === "departure") ? [styles.HeaderBox, styles.active].join(' ') :  styles.HeaderBox} onClick={() => {
									reset()
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
    )
}

export default ModalBox

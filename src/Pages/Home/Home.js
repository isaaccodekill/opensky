import React, {useState} from 'react'
import styles from './Home.module.css'
import Card from '../../Components/UI/Card/Card'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import NavBar from '../../Components/UI/NavBar/NavBar'
import Loader from '../../Components/UI/Loader/Loader'
import Result from '../../Components/UI/Result/Result'
import Button from '@material-ui/core/Button';

// import Loader from ''


const Home = () => {
	const [modalOpen, setModalOpen] = useState(false)
	const [mins, setMins] = useState(0)
	const [modalDetails, setModalDetails] = useState({
		name: "",
		image:"",
		location: "",
		code: ""
	})
	const [mode, setMode] = useState('arrival')

	const CURRENT_TIME_IN_SECS = Math.round(new Date().getTime()) / 1000
	let results = []
	let showLoader = true
	let content = null
	let setTimesec = ""

	const Timesetter = (mins) => {
		// get the current time
		const currentTimeSecs = Math.round(new Date().getTime()) / 1000
		const minsInSecs = mins * 60
		setTimesec = currentTimeSecs - minsInSecs
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
		showLoader = false
		let url = `https://USERNAME:PASSWORD@opensky-network.org/api/flights/${mode}?airport=${modalDetails.airportCode}&begin=${setTimesec}&end=${CURRENT_TIME_IN_SECS}`
		fetch(url)
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(error => console.log(error))
	}

	if (showLoader){
		content = (<div className={styles.LoaderContainer}><Loader/></div>)
	}else{
		content = results.map(result => <Result/>)
	}


	const open = (idnumber) => {
		const extractedArr = cities.filter(({ id }) => id == idnumber )
		setModalDetails(extractedArr[0]) 
		setModalOpen(true)
	}
	const close = () => setModalOpen(false)		

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
									setMode('arrival')}}>Arrivals</div>
								<div className={(mode == "departure") ? [styles.HeaderBox, styles.active].join(' ') :  styles.HeaderBox} onClick={() => setMode('departure')}>Departures</div>
							</div>
							<div className={styles.actionBar}>
								<div className="inputbox">
								<input type="number" onChange={(e) => {
									setMins(e.target.value)
									Timesetter(mins)
									getFlightdetails(mode)
								}} className={styles.input}/> <span>mins ago</span> 
								</div>
							</div>
							<div className={styles.mainContent}>
								{(mins > 0) ? content : <h1 className={styles.warning}>input number of minutes</h1> }				
							</div>
						</div>

		        </div>
      	</Modal>


			{/*card grid*/}
			<div className={styles.gridContainer}>
				{cardList}
			</div>
		</div>
	)
}

export default Home 

import React, {useState} from 'react'
import styles from './Home.module.css'
import Card from '../../Components/UI/Card/Card'
import NavBar from '../../Components/UI/NavBar/NavBar'
import cities from '../../Utils/cities'
import ModalBox from '../../Components/Modal/Modal'



const Home = () => {

	// state

	const [modalOpen, setModalOpen] = useState(false)
	const [modalDetails, setModalDetails] = useState({
		name: "",
		image:"",
		location: "",
		code: ""
	})
	

	// function to open the modal and feed it the details
	const open = (idnumber) => {
		const extractedArr = cities.filter(({ id }) => id === idnumber )
		setModalDetails(extractedArr[0]) 
		setModalOpen(true)
	}
	
	
	// create cards for cities
	const cardList = cities.map(city => <Card {...city} key={city.id} clickFunc={() => open(city.id)} />)

	return (
		<div className={styles.Homepage}>
			<NavBar/>
			<ModalBox modalOpen={modalOpen} setModalOpen={setModalOpen} modalDetails={modalDetails} />
			<div className={styles.gridContainer}>
				{cardList}
			</div>
		</div>
	)
}

export default Home 

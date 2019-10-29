import React, {useState} from 'react'
import styles from './Home.module.css'
import Card from '../../Components/UI/Card/Card'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import NavBar from '../../Components/UI/NavBar/NavBar'

// import Loader from ''


const Home = () => {
	const cities = [
		{
			id: 1,
			name: "Atlanta",
			Location: "Atlanta, Georgia",
			image: "https://images.unsplash.com/photo-1504983376254-592a0ea9b0cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=891&q=80"
		},
		{
			id: 2,
			name: "Chicago",
			Location: "chicago, illinois",
			image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=813&q=80"
		},
		{
			id: 3,
			name: "Los Angeles",
			Location: "California",
			image: "https://images.unsplash.com/photo-1512746133319-6559ec0c1f39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=786&q=80"
		},
		{
			id: 4,
			name: "Dallas",
			Location: "Dallas, Texas",
			image: "https://images.unsplash.com/photo-1542482780641-7f549ee20bc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80"
		},
		{
			id: 5,
			name: "New York",
			Location: "New York",
			image: "https://images.unsplash.com/photo-1532960401447-7dd05bef20b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=379&q=80"
		},
		{
			id: 6,
			name: "Denver",
			Location: "Denver, colorado",
			image: "https://images.unsplash.com/photo-1507070989769-45210775a437?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=605&q=80"
		},
		{
			id: 7,
			name: "San Francisco",
			Location: "California",
			image: "https://images.unsplash.com/photo-1461696114087-397271a7aedc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
		},
		{
			id: 8,
			name: "Las Vegas",
			Location: "Nevada",
			image: "https://images.unsplash.com/photo-1516975698824-571e2c952dbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
		},
		{
			id: 9,
			name: "Pheonix",
			Location: "Arizona",
			image: "https://images.unsplash.com/photo-1437153225860-b850e2a4d0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
		},
		{
			id: 10,
			name: "Houston",
			Location: "Texas",
			image: "https://images.unsplash.com/photo-1470082719408-b2843ab5c9ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=891&q=80"
		},
	]


	const [modalOpen, setModalOpen] = useState(false)
	const [modalDetails, setModalDetails] = useState({
		name: "",
		image:"",
		location: ""
	})

	const open = (id) => {
		const extractedArr = cities.filter(({ id }) => id == id )
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
      		>
		        <div className={styles.ModalMain}>
					<div className="imageHolder">
						<img src="" alt=""/>
						<h2>{modalDetails.name}</h2>
						<div className={styles.mainContainer}>
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

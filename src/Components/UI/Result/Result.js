import React from 'react'
import styles from './Result.module.css'

const Result = ({icao24, callsign, estDepartureAirport, estArrivalAirport, departureTime, estimatedArrivalTime}) => {
	return (
		<div className={styles.Result}>
			<div className={styles.informationGroup}>
				<span className={styles.Lead}>icao24:</span> <span className={styles.result}>{icao24}</span>
			</div>
			<div className={styles.informationGroup}>
				<span className={styles.Lead}>callsign:</span> <span className={styles.result}>{callsign}</span>
			</div>
			<div className={styles.informationGroup}>
				<span className={styles.Lead}>Departure-Airport:</span> <span className={styles.result}>{estDepartureAirport}</span>
			</div>
			<div className={styles.informationGroup}>
				<span className={styles.Lead}>Departure-time:</span> <span className={styles.time}> -  {new Date(departureTime * 1000).toLocaleString()}</span>
			</div>
			<div className={styles.informationGroup}>
				<span className={styles.Lead}>Arrival-Airport:</span> <span className={styles.result}>{estArrivalAirport}</span>
			</div>
		</div>
	)
}

export default Result
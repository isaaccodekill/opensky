import React from 'react'
import styles from './Result.module.css'

const Result = ({config}) => {
	return (
		<div className={styles.Result}>
			<div className={styles.informationGroup}>
				<span className={styles.Lead}>Airline:</span>
				<span className={styles.result}>result</span>
			</div>
		</div>
	)
}

export default Result
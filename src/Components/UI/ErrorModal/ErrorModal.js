import React, {useState, useEffect} from 'react'
import styles from './ErrorModal.module.css'

const Modal = ({show}) => {


    const [hide, setHide] = useState(false)

    let classes = [styles.Modal]
    if (show){
        classes.push(styles.show)
    }
   
    return (
        <div className={classes.join(' ')}>
            <p>Wrong login credentials, try using "demo" as both username and password</p>
        </div>

    )
}


export default Modal 
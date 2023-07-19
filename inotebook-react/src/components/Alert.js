import React, { useContext } from 'react'
import AlertContext from '../context/alert/AlertContext'

const Alert = () => {

    const alertValue = useContext(AlertContext);

    const captializeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    return (
        <div style={{ height: "50px" }}>
            {alertValue.alert && <div className={`alert alert-${alertValue.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{captializeFirstLetter(alertValue.alert.type === "danger" ? "failure" : alertValue.alert.type)}</strong> {alertValue.alert.message}
            </div>}
        </div>
    )
}

export default Alert

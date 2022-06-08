import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import RecordService from "../services/RecordService"

const Record = props => {
    const { id } = useParams()
    let navigate = useNavigate()
    const initialRecordState = {
        id: null,
        country: "",
        year: "",
        value: ""
    }
    const [currentRecord, setCurrentRecord] = useState(initialRecordState)
    const [message, setMessage] = useState("")
    
    const getRecord = id => {
        RecordService.get(id)
            .then(response => {
                setCurrentRecord(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }
    
    useEffect(() => {
        if (id)
            getRecord(id)
    }, [id])
    
    const handleInputChange = event => {
        const { name, value } = event.target
        setCurrentRecord({ ...currentRecord, [name]: value })
    }
    const updateRecord = () => {
        RecordService.update(currentRecord.id, currentRecord)
            .then(response => {
                console.log(response.data)
                setMessage("The record was updated successfully!")
            })
            .catch(e => {
                console.log(e)
            })
    }
    const deleteRecord = () => {
        RecordService.remove(currentRecord.id)
            .then(response => {
                console.log(response.data)
                navigate("/records")
            })
            .catch(e => {
                console.log(e)
            })
    }
    return (
        <div>
            {currentRecord ? (
                <div className="edit-form">
                    <h4>Record</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                className="form-control"
                                id="country"
                                name="country"
                                value={currentRecord.country}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="year">Year</label>
                            <input
                                type="text"
                                className="form-control"
                                id="year"
                                name="year"
                                value={currentRecord.year}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="value">Value</label>
                            <input
                                type="text"
                                className="form-control"
                                id="value"
                                name="value"
                                value={currentRecord.value}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                    <button className="badge bg-danger mr-2" onClick={deleteRecord}>
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="badge bg-success"
                        onClick={updateRecord}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a record...</p>
                </div>
            )}
        </div>
    )
}
export default Record

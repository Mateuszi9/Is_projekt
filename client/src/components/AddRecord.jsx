import React, { useState } from "react"
import RecordService from "../services/RecordService"

const AddRecord = () => {
    const initialRecordState = {
        id: null,
        country: "",
        year: "",
        value: ""
    }

    const [record, setRecord] = useState(initialRecordState)
    const [submitted, setSubmitted] = useState(false)

    const handleInputChange = event => {
        const { name, value } = event.target
        setRecord({ ...record, [name]: value })
    }

    const saveRecord = () => {
        var data = {
            country: record.country,
            year: record.year,
            value: record.value
        }
        RecordService.create(data)
            .then(response => {
                setRecord({
                    id: response.data.id,
                    country: response.data.country,
                    year: response.data.year,
                    value: response.data.value
                })
                setSubmitted(true)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }
    const newRecord = () => {
        setRecord(initialRecordState)
        setSubmitted(false)
    }
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newRecord}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            className="form-control"
                            id="country"
                            required
                            value={record.country}
                            onChange={handleInputChange}
                            name="country"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input
                            type="text"
                            className="form-control"
                            id="year"
                            required
                            value={record.year}
                            onChange={handleInputChange}
                            name="year"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="value">Value</label>
                        <input
                            type="text"
                            className="form-control"
                            id="value"
                            required
                            value={record.value}
                            onChange={handleInputChange}
                            name="value"
                        />
                    </div>
                    <button onClick={saveRecord} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    )
}
export default AddRecord

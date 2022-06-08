import React, { useState, useEffect } from "react"
import RecordService from "../services/RecordService"
import { Link } from "react-router-dom"

const RecordsList = () => {
    const [records, setRecords] = useState([])
    const [currentRecord, setCurrentRecord] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [searchCountry, setSearchCountry] = useState("")
    const [searchYear, setSearchYear] = useState("")

    useEffect(() => {
        retrieveRecords()
    }, [])

    const onChangeSearchCountry = e => {
        const searchCountry = e.target.value
        setSearchCountry(searchCountry)
    }
    
    const onChangeSearchYear = e => {
        const searchYear = e.target.value
        setSearchYear(searchYear)
    }

    const retrieveRecords = () => {
        RecordService.getAll()
            .then(response => {
                setRecords(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const refreshList = () => {
        retrieveRecords()
        setCurrentRecord(null)
        setCurrentIndex(-1)
    }

    const setActiveRecord = (record, index) => {
        setCurrentRecord(record)
        setCurrentIndex(index)
    }

    const removeAllRecords = () => {
        RecordService.removeAll()
            .then(response => {
                console.log(response.data)
                refreshList()
            })
            .catch(e => {
                console.log(e)
            })
    }

    const findByCountry = () => {
        RecordService.findByCountry(searchCountry)
            .then(response => {
                setRecords(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const findByYear = () => {
        RecordService.findByYear(searchYear)
            .then(response => {
                setRecords(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by country"
                        value={searchCountry}
                        onChange={onChangeSearchCountry}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByCountry}
                        >
                            Search by country
                        </button>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by year"
                        value={searchYear}
                        onChange={onChangeSearchYear}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByYear}
                        >
                            Search by year
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Records List</h4>
                <ul className="list-group">
                    {records &&
                        records.map((record, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveRecord(record, index)}
                                key={index}
                            >
                                {record.country} - {record.year}
                            </li>
                        ))}
                </ul>
                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllRecords}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentRecord ? (
                    <div>
                        <h4>Record</h4>
                        <div>
                            <label>
                                <strong>Country:</strong>
                            </label>{" "}
                            {currentRecord.country}
                        </div>
                        <div>
                            <label>
                                <strong>Year:</strong>
                            </label>{" "}
                            {currentRecord.year}
                        </div>
                        <div>
                            <label>
                                <strong>Value:</strong>
                            </label>{" "}
                            {currentRecord.value}
                        </div>
                        <Link
                            to={"/records/" + currentRecord.id}
                            className="badge bg-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a record...</p>
                    </div>
                )}
            </div>
        </div>
    )
}
export default RecordsList

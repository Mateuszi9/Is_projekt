import http from "../http-common"

const getAll = () => {
    return http.get("/records")
}

const get = (id) => {
    return http.get(`/records/${id}`)
}

const create = (data) => {
    return http.post("/records", data)
}

const update = (id, data) => {
    return http.put(`/records/${id}`, data)
}

const remove = (id) => {
    return http.delete(`/records/${id}`)
}

const removeAll = () => {
    return http.delete(`/records`)
}

const findByCountry = (country) => {
    return http.get(`/records?country=${country}`)
}

const findByYear = (year) => {
    return http.get(`/records?year=${year}`)
}

const RecordService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByCountry,
    findByYear
}

export default RecordService

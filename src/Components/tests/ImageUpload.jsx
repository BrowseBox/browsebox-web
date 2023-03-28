import { useState } from 'react'
import axios from 'axios'

axios.defaults.baseURL = 'http://54.218.71.46:7355';

export default function NewPost() {
    const [request, setRequest] = useState("")
    const [type, setType] = useState("")
    const [id, setid] = useState("")
    const [index, setIndex] = useState("")
    const [file, setFile] = useState()


    const submit = async event => {
        event.preventDefault()

        console.log("Request: " + request)
        console.log("Type: " + type)
        console.log("ID: " + id)
        console.log("Index: " + index)

        const formData = new FormData();
        if (request === "update") {
            formData.append("type", type)
            formData.append("id", id)
            formData.append("index", index)
            formData.append("image", file)
            await axios.post("/api/image/update", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        } else if (request === "upload") {
            formData.append("type", type)
            formData.append("id", id)
            formData.append("index", index)
            formData.append("image", file)
            await axios.post("/api/image/upload", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        } else if (request === "delete") {
            formData.append("type", type)
            formData.append("id", id)
            formData.append("index", index)
            await axios.post("/api/image/delete", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        } else if (request === "retrieve") {
            // /api/image/:type/:id/:index
            axios.get(`/api/image/retrieve/${type}/${id}/${index}`)
        } else {
            console.log("Invalid request")
        }
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Upload Tests</h1>
            <form onSubmit={submit} style={{ width: 650 }} className="flex flex-col space-y-5 px-5 py-14">
                <input onChange={fileSelected} type="file" accept="image/*"></input>
                <input value={request} onChange={e => setRequest(e.target.value)} type="text" placeholder='request: upload, update, delete'></input>
                <input value={type} onChange={e => setType(e.target.value)} type="text" placeholder='type: profile, listing'></input>
                <input value={id} onChange={e => setid(e.target.value)} type="text" placeholder='id: either profile or listing id'></input>
                <p>Only use index for listings</p>
                <input value={index} onChange={e => setIndex(e.target.value)} type="text" placeholder='index'></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

import { useState } from 'react'
import axios from 'axios'
import React from 'react';

axios.defaults.baseURL = 'http://localhost:8080';

export default function ImageUpload() {
    const [request, setRequest] = useState("")
    const [type, setType] = useState("")
    const [id, setid] = useState("")
    const [index, setIndex] = useState(0)
    const [file, setFile] = useState()

    const submit = async event => {
        event.preventDefault()
        const formData = new FormData();

        formData.append("request", request)
        formData.append("type", type)
        formData.append("id", id)
        formData.append("image", file)
        formData.append("index", index)
        await axios.post("/api/images/upload", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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
                <input value={request} onChange={e => setRequest(e.target.value)} type="text" placeholder='request: upload, update'></input>
                <input value={type} onChange={e => setType(e.target.value)} type="text" placeholder='type: profile, listing'></input>
                <input value={id} onChange={e => setid(e.target.value)} type="text" placeholder='id: either profile or listing id'></input>
                <p>Only use index for listings</p>
                <input value={index} onChange={e => setIndex(e.target.value)} type="text" placeholder='index'></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

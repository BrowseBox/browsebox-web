import { useState } from 'react'
import axios from 'axios'
import React from 'react';

axios.defaults.baseURL = 'http://localhost:8080';

export default function ImageUpload() {
    const [request, setRequest] = useState("")
    const [type, setType] = useState("")
    const [id, setid] = useState("")
    const [file, setFile] = useState()

    const submit = async event => {
        event.preventDefault()
        const formData = new FormData();

        formData.append("request", request)
        formData.append("type", type)
        formData.append("id", id)
        formData.append("image", file)
        await axios.post("/api/upload", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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
                <input value={request} onChange={e => setRequest(e.target.value)} type="text" placeholder='request'></input>
                <input value={type} onChange={e => setType(e.target.value)} type="text" placeholder='type'></input>
                <input value={id} onChange={e => setid(e.target.value)} type="text" placeholder='id'></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

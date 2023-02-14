import React, { useState, useEffect } from "react";
import axios from 'axios';

function DeleteUserTest() {
    const [id, setId] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${id}`);
        axios
            .delete(
                "http://localhost:3001/delete-user/" + id)
            .then((res) => {
                if (res.status === 200) {
                    console.log("User successfully deleted");
                    setMessage("User successfully deleted");
                    //window.location.reload(true);
                    // eslint-disable-next-line no-restricted-globals

                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Id:
                <input
                    type="text"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
            </label>
            <input type="submit" value="Submit" />
            <h1> {message} </h1>
        </form>
    );

}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

import UserTableRow from "./UserTableRow";



const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/all-users")
            .then(({ data }) => {
                setUsers(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const DataTable = () => {
        return users.map((res, i) => {
            return <UserTableRow obj={res} key={i} />;
        });
    };

    return (
        <div className="table-wrapper">
            <Table  variant="dark" hover responsive="sm">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    {/*<th>Password</th>*/}
                    <th>Rating</th>
                    {/*<th>Active</th>*/}
                    {/*<th>Edit or Delete User</th>*/}

                </tr>
                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        </div>
    );
};

export default UserList;

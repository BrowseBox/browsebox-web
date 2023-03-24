import React from "react";
import { Button } from "react-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Link } from "react-router-dom";
import axios from "axios";


const UserTableRow = (props) => {
    // const { _id, first_name, last_name, email, password, role, active } = props.obj;
    const { user_id, user_name, user_email, user_rating} = props.obj;



    // const deleteUser = () => {
    //     axios
    //         .delete(
    //             "http://localhost:4000/users/delete-user/" + _id)
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 console.log("User successfully deleted");
    //                 navigate ("/Burner", {state: {home:"/user-list"}});
    //                 //window.location.reload(true);
    //                 // eslint-disable-next-line no-restricted-globals
    //
    //             } else Promise.reject();
    //         })
    //         .catch((err) => alert("Something went wrong"));
    // };


    // save Role change to database
    // const saveRole = (role) => {
    //     axios
    //         .put(
    //             "http://localhost:4000/users/update-user/" + _id,
    //             { role })
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 console.log("Role successfully saved");
    //                 // window.location.reload();
    //             } else Promise.reject();
    //         })
    //         .catch((err) => alert("Something went wrong"));
    // }

    // save Active change to database
    // const saveActive = (active) => {
    //     axios
    //         .put(
    //             "http://localhost:4000/users/update-user/" + _id,
    //             { active })
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 console.log("Is Active successfully saved");
    //                 //window.location.reload();
    //             } else Promise.reject();
    //         })
    //         .catch((err) => alert("Something went wrong"));
    // }

    return (

        <tr>
            <td>{user_id}</td>
            <td>{user_name}</td>
            <td>{user_email}</td>
            <td>{user_rating}</td>
            {/*<td>{password}</td>*/}
            {/*<td><BootstrapSwitchButton*/}
            {/*    checked={role === "0" ? true : false} onlabel="Admin" offlabel="User" width={100}*/}
            {/*    onstyle="primary" offstyle="outline-secondary"*/}
            {/*    onChange={*/}
            {/*        (checked) => { saveRole(checked ? "0" : "1")*/}
            {/*        }*/}
            {/*    }*/}
            {/*/></td>*/}
            {/*/!*{role === 0 ? true : false}</td>*!/*/}
            {/*/!*<td>{active}</td>*!/*/}
            {/*<td><BootstrapSwitchButton checked={active === "true" ? true : false} onstyle="success"*/}
            {/*                           onlabel="Active" offlabel="Inactive" width={100}*/}
            {/*                           onChange={*/}
            {/*                               (checked) => { saveActive(checked ? true : false)*/}
            {/*                               }*/}
            {/*                           }*/}
            {/*/></td>*/}
            {/*<td>*/}
            {/*    <Link className="edit-link"*/}
            {/*        // to={"/edit-user/" + {_id:_id,first_name:first_name,last_name:last_name,email:email,password:password,*/}
            {/*        //     role:role,active:active}}>*/}
            {/*          to={`/find-user-by-id/:id` + _id}>*/}
            {/*        <Button variant="warning" className="me-4">Edit</Button>*/}

            {/*    </Link>*/}

            {/*    <Button onClick={deleteUser}*/}
            {/*            variant="danger">*/}
            {/*        Delete*/}
            {/*    </Button>*/}
            {/*</td>*/}
        </tr>
    );
};

export default UserTableRow;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import styled from 'styled-components';


const StyledTableCell = styled(TableCell)`
  font-weight: bold;
`;

const AdminPanel = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/all-users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.post('/delete-user', { id });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const editUser = (user) => {
        // Implement edit user functionality
    };

    return (
        <Container>
            <Typography variant="h4" component="h2" gutterBottom>User List ({users.length})</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Rating</StyledTableCell>
                            <StyledTableCell>School ID</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.user_id}>
                                <TableCell>{user.user_id}</TableCell>
                                <TableCell>{user.user_name}</TableCell>
                                <TableCell>{user.user_email}</TableCell>
                                <TableCell>{user.user_rating}</TableCell>
                                <TableCell>{user.school_id}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => editUser(user)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteUser(user.user_id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminPanel;

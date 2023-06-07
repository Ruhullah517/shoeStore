import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import './users.css';
import { useSelector } from 'react-redux';
import { store } from '../store/store';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const User = () => {


    let [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('/getUsers').then((resp) => {
            setUsers(resp.data)
        })
    })






    let dispatch = useDispatch();


    return (
        <Box sx={{ width: '100%' }}  >
            <Typography variant="h3" component="h2" style={{ textAlign: 'center' }}>
                Users List
            </Typography>
            <Stack spacing={2}>
                <Item className='List listHeading'>
                    <div className='main-List'>
                        <div className='childList'>
                            Select
                        </div>
                        <hr className='hr' />
                        <div className='childList'>
                            User Name
                        </div>
                        <hr className='hr' />
                        <div className='childList'>
                            <b>Email</b>
                        </div>
                        <hr className='hr' />
                        <div className='childList'>
                            <b>Password</b>
                        </div>
                        <hr className='hr' />
                        <div className='childList'>
                            Remove
                        </div>
                    </div>
                </Item>
                {users.map((user, index) => {


                    return (user.type != "Admin" && <Item className='List' key={index}>
                        <div className='main-List'>
                            <div className='childList'>
                                <input type='checkbox' />
                            </div>
                            <hr className='hr' />
                            <div className='childList'>
                                <b>{user.userName}</b>
                            </div>
                            <hr className='hr' />
                            <div className='childList'>
                                <b>{user.email}</b>
                            </div>
                            <hr className='hr' />
                            <div className='childList'>
                                <b>{user.password}</b>

                            </div>
                            <hr className='hr' />
                            <div className='childList'>
                                <button className='removeBtn' onClick={() => {
                                    axios.delete('/deleteUser?id=' + user._id).then(() => {
                                        users.splice(index, 1);
                                        setUsers([...users]);
                                    })

                                }}>Remove</button>
                            </div>
                        </div>
                    </Item>)
                })}

            </Stack>
        </Box>
    );
};

export default User;
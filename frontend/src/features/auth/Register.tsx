import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch } from '../../app/hooks';
import { registerAsync } from './authSlice';
import styles from './Auth.module.css';

export const Register = () => {
    const dispatch = useAppDispatch();
    const [crendential, setCrendential] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        setCrendential(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const registerAction = await dispatch(registerAsync(crendential));

        if (registerAsync.fulfilled.match(registerAction)) navigate("/login");
    }

    return (
        <div className={styles.login}>
            <form className={styles.content} onSubmit={onSubmit}>
                <h2>Register</h2>
                <label>Username:</label>
                <input type="text" name="username" onChange={handleChange} />
                <label>Password: </label>
                <input type="password" name="password" onChange={handleChange} />
                <button type="submit">Sign Up</button>
                <div>
                    {'Already have an account? '}
                    <Link to="/login">Login</Link>
                    {' now'}
                </div>
            </form>
        </div>
    );
}

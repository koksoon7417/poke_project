import { useState } from 'react';
import { Link } from "react-router-dom";

import { useAppDispatch } from '../../app/hooks';
import { loginAsync } from './authSlice';
import styles from './Auth.module.css';

export const Login = () => {
    const dispatch = useAppDispatch();
    const [crendential, setCrendential] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e: any) => {
        setCrendential(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        await dispatch(loginAsync(crendential));
    }

    return (
        <div className={styles.login}>
            <form className={styles.content} onSubmit={onSubmit}>
                <h2>Welcome to Pokemon World</h2>
                <label>Username:</label>
                <input type="text" name="username" onChange={handleChange} />
                <label>Password: </label>
                <input type="password" name="password" onChange={handleChange} />
                <button type="submit">Login</button>
                <Link to="/register">Create an account</Link>
            </form>
        </div>
    );
}

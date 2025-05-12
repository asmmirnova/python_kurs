import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";

const Main = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login")
    };

    const handleSignup = () => {
        navigate("/signup")
    };

    const checkLogin = async(event) => {
        const response = await fetch('http://localhost:8000/api/check_login', {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            const result = await response.json();
            if (result === true) {
                navigate("/selection")
            }
        }
    }

    useEffect(() => {
        void checkLogin()
    }, []);

    return (
        <div id="main-container">
            <div id="main">
                <h1>Чат</h1>
                <div id="buttons">
                    <button onClick={handleLogin}>
                        Войти
                    </button>
                    <button onClick={handleSignup}>
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Main;
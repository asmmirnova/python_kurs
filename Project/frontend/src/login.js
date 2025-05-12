import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleMailChange = (event) => {
        setMail(event.target.textContent);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.textContent);
    };
    const handleEntrance = async(event) => {
        const data = {
            mail,
            password,
        };
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: 'include'
        });
        if (response.ok) {
            const result = await response.json();
            if (result) {
                navigate("/selection")
            }
            else {
                alert("Неверный пароль")
            }
        }
    };

    return (
        <div id="login-container">
            <div id="login">
                <h1>Вход</h1>
                <div id="login-field">
                    <p className={"label"}>Логин</p>
                    <div
                        id="username"
                        role="textbox"
                        contentEditable
                        onInput={handleMailChange}
                        suppressContentEditableWarning={true}
                    ></div>
                    <p className={"label"}>Пароль</p>
                    <div
                        id="password"
                        role="textbox"
                        contentEditable
                        onInput={handlePasswordChange}
                        suppressContentEditableWarning={true}
                    ></div>
                    <button id="enter" type="button" name="enter" onClick={handleEntrance}>
                        <span>Войти</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Signup = () => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setName(event.target.textContent);
    };
    const handleMailChange = (event) => {
        setMail(event.target.textContent);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.textContent);
    };
    const handleCheckboxChange = (event) => {
        setIsAdmin(event.target.checked);
    };
    async function handleEntrance() {
        const data = {
            name,
            mail,
            password,
            isAdmin,
        };
        await fetch('http://localhost:8000/api/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: 'include'
        });
        navigate("/selection")
    }

    return (
        <div id="signup-container">
            <div id="signup">
                <h1>Регистрация</h1>
                <div id="signup-field">
                    <p className={"label"}>Логин</p>
                    <div
                        id="username"
                        role="textbox"
                        contentEditable
                        onInput={handleUsernameChange}
                        suppressContentEditableWarning={true}
                    ></div>
                    <p className={"label"}>Почта</p>
                    <div
                        id="password"
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
                    <div id={"checkbox"}>
                        <input
                            type="checkbox"
                            id="isAdmin"
                            name="isAdmin"
                            onChange={handleCheckboxChange}
                        ></input>
                        <label htmlFor="isAdmin">Я администратор</label>
                    </div>
                    <button id="enter" type="button" name="enter" onClick={handleEntrance}>
                        <span>Зарегистрироваться</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
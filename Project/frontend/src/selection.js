import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./selection.css";

const Selection = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = useState(false);

    const checkAdmin = async () => {
        const res = await fetch('http://localhost:8000/api/check_login', {
            method: 'GET',
            credentials: 'include'
        });
        if (res.ok) {
            const loginResult = await res.json();
            if (!loginResult) return navigate("/");
        }

        // Запрос текущего пользователя
        const response = await fetch('http://localhost:8000/api/current_user', {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            const user = await response.json();
            console.log(user)
            setIsAdmin(user.isAdmin);
        }
    };

    useEffect(() => {
        void checkAdmin();
    }, []);

    const getUsers = async(event) => {
        const response = await fetch('http://localhost:8000/api/users', {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            const result = await response.json();
            setUsers(
                result.map((admin, index) => ({
                    id: index + 1,
                    name: admin,
                }))
            );
        }
    }

    useEffect(() => {
        void getUsers();
    }, []);

    const handleUserSelect = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleStartChat = () => {
        if (selectedUser) {
            navigate("/chat", { state: { userName: selectedUser } });
        }
    };

    const exit = async(event) => {
        const response = await fetch('http://localhost:8000/api/exit', {
            method: 'POST',
            credentials: 'include'
        });
    }

    const handleExit = () => {
        void exit();
        navigate("/");
    };

    const checkLogin = async(event) => {
        const response = await fetch('http://localhost:8000/api/check_login', {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            const result = await response.json();
            if (result === false) {
                navigate("/")
            }
        }
    }

    useEffect(() => {
        void checkLogin()
    }, []);

    return (
        <div id={"selection-container"}>
            <div id="selection">
                <button id="exit" type="button" name="exit" onClick={handleExit}>
                    <span>Выйти</span>
                </button>
                <h1>Выбор собеседника</h1>

                <select onChange={handleUserSelect} size={8}>
                    {users.map((user) => (
                        <option key={user.id} value={user.name}>
                            {user.name}
                        </option>
                    ))}
                </select>

                <button onClick={handleStartChat} disabled={!selectedUser}
                        id={"chat-button"}>
                    Начать чат
                </button>

                {isAdmin && (
                    <button
                        onClick={async () => {
                            if (selectedUser) {
                                await fetch('http://localhost:8000/api/delete_user', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ name: selectedUser }),
                                    credentials: 'include'
                                });
                                await getUsers(); // Обновить список
                                setSelectedUser(null);
                            }
                        }}
                        disabled={!selectedUser}
                        id={"delete-user-button"}
                    >
                        Удалить пользователя
                    </button>
                )}
            </div>
        </div>
    );

};

export default Selection;
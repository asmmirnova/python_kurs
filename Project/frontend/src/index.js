import React from "react";
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from "./main"
import Login from "./login"
import Signup from "./signup"
import Selection from "./selection"
import Chat from "./chat"
import './index.css'

const Root = ReactDOM.createRoot(document.getElementById("root"))

class Body extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={
                            <Main/>
                        }/>
                        <Route path={"/login"} element={
                            <Login/>
                        }/>
                        <Route path={"/signup"} element={
                            <Signup/>
                        }/>
                        <Route path={"/selection"} element={
                            <Selection/>
                        }/>
                        <Route path={"/chat"} element={
                            <Chat/>
                        }/>
                    </Routes>
                </BrowserRouter>
            </>
        )
    }
}

Root.render(<Body/>)
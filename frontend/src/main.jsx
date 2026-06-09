import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import {Toaster} from 'react-hot-toast'

import App from "./App.jsx";

import "./index.css";
import {AuthProvider} from "./context/AuthContext.jsx";
import {UIProvider} from "./context/UIContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <UIProvider>
            <Toaster
                position='bottom-right'
                toastOptions={{
                    duration: 4000,
                }}
            />
            <App />
        </UIProvider>
    </AuthProvider>
);
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import "./App.css";

function App() {
    const [estConnecte, setEstConnecte] = useState<Boolean>(
        Boolean(localStorage.getItem("token")),
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/connexion"
                    element={
                        estConnecte ? (
                            <Navigate to="/dashboard" />
                        ) : (
                            <Connexion
                                onConnexion={() => setEstConnecte(true)}
                            />
                        )
                    }
                />

                <Route
                    path="/inscription"
                    element={
                        estConnecte ? (
                            <Navigate to="/dashboard" />
                        ) : (
                            <Inscription />
                        )
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        estConnecte ? (
                            <Dashboard />
                        ) : (
                            <Navigate to="/connexion" />
                        )
                    }
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to={estConnecte ? "/dashboard" : "/connexion"}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

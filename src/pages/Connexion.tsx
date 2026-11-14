import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connexion } from "../services/auth";
interface ConnexionProps {
    onConnexion: () => void;
}
function Connexion({ onConnexion }: ConnexionProps) {
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function gererConnexion(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage("");

        try {
            await connexion(email.trim(), motDePasse);

            // Enregistrer les informations utilisateur
            // est déjà fait dans auth.js ? Nous allons le vérifier ensuite.
            onConnexion();
            navigate("/dashboard");
        } catch (erreur) {
            if (erreur instanceof Error) {
                setMessage(erreur.message);
            } else {
                setMessage("Une erreur inconnue est survenue.");
            }
        }
    }
    function gererEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }
    function gererMotDePasse(event: React.ChangeEvent<HTMLInputElement>) {
        setMotDePasse(event.target.value);
    }
    return (
        <main>
            <h1>Connexion</h1>

            <form onSubmit={gererConnexion}>
                <input
                    type="email"
                    placeholder="Adresse email"
                    value={email}
                    onChange={gererEmail}
                    required
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={motDePasse}
                    onChange={gererMotDePasse}
                    required
                />

                <button type="submit">Se connecter</button>
            </form>

            {message && <p className="erreur">{message}</p>}

            <p>
                Pas encore de compte ? <Link to="/inscription">S'inscrire</Link>
            </p>
        </main>
    );
}

export default Connexion;

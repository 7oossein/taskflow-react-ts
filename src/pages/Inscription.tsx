import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { inscription } from "../services/auth";

function Inscription() {
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [message, setMessage] = useState("");
    const [succes, setSucces] = useState(false);

    const navigate = useNavigate();

    async function gererInscription(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        setMessage("");
        setSucces(false);

        try {
            await inscription(nom.trim(), email.trim(), motDePasse);

            setMessage("Compte créé avec succès !");
            setSucces(true);

            setTimeout(() => {
                navigate("/connexion");
            }, 1500);
        } catch (erreur) {
            if(erreur instanceof Error){
                setMessage(erreur.message);
            }
            else{
                setMessage("Une erreur inconnue est survenue.");
            }
        }
    }
    function gererNom(event:React.ChangeEvent<HTMLInputElement>){
        setNom(event.target.value);
    }
    function gererEmail(event:React.ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value);
    }
    function gererMotDePasse(event:React.ChangeEvent<HTMLInputElement>){
        setMotDePasse(event.target.value);
    }
    return (
        <main>
            <h1>Inscription</h1>

            <form onSubmit={gererInscription}>
                <input
                    type="text"
                    placeholder="Nom"
                    value={nom}
                    onChange={gererNom}
                    required
                />

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

                <button type="submit">Créer un compte</button>
            </form>

            {message && (
                <p style={{ color: succes ? "green" : "red" }}>{message}</p>
            )}

            <p>
                Déjà un compte ? <Link to="/connexion">Se connecter</Link>
            </p>
        </main>
    );
}

export default Inscription;

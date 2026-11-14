import { apiFetch } from "./api";

import type { Utilisateur,ReponseConnexion } from "../types";


export async function inscription(nom:string, email:string, motDePasse:string): Promise<unknown> {
    return await apiFetch("/auth/inscription", {
        method: "POST",
        body: JSON.stringify({ nom, email, motDePasse }),
    });
}

export async function connexion(email:string, motDePasse:string):Promise<Utilisateur> {
    const data = await apiFetch("/auth/connexion", {
        method: "POST",
        body: JSON.stringify({ email, motDePasse }),
    }) as ReponseConnexion;

    localStorage.setItem("token", data.token);

    localStorage.setItem("utilisateur", JSON.stringify(data.utilisateur));

    return data.utilisateur;
}


const API_URL = "https://taskflow-5hsg.onrender.com";
import type { TacheType } from "../types";

function verifierReponse(reponse: Response): void {
    if (reponse.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("utilisateur");
        localStorage.removeItem("taches");
        throw new Error("Session expirée. Veuillez vous reconnecter.");
    }
}

async function envoyerRequete(
    route: string,
    options: RequestInit = {},
): Promise<unknown> {
    const token = localStorage.getItem("token");

    const reponse = await fetch(`${API_URL}${route}`, {
        ...options,
        headers: {
            ...(options.body && { "Content-Type": "application/json" }),
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    });

    verifierReponse(reponse);

    const resultat = await reponse.json();

    if (!reponse.ok) {
        const donnees = resultat as {
            message?: string;
            erreur?: string;
        };

        throw new Error(
            donnees.message || donnees.erreur || "Une erreur est survenue.",
        );
    }

    return resultat;
}
export async function apiFetch(
    route: string,
    options: RequestInit = {},
): Promise<unknown> {
    return await envoyerRequete(route, options);
}
export async function obtenirTaches(): Promise<TacheType[]> {
    return (await envoyerRequete("/taches")) as TacheType[];
}

export async function ajouterTache(texte: string): Promise<TacheType> {
    const resultat = await envoyerRequete("/taches", {
        method: "POST",
        body: JSON.stringify({ texte }),
    });

    return (resultat as { tache: TacheType }).tache;
}

export async function supprimerTache(id: number): Promise<unknown> {
    return await envoyerRequete(`/taches/${id}`, {
        method: "DELETE",
    });
}

export async function modifierTache(
    id: number,
    texte: string,
): Promise<TacheType> {
    const resultat = await envoyerRequete(`/taches/${id}`, {
        method: "PUT",
        body: JSON.stringify({ texte }),
    });

    return (resultat as { tache: TacheType }).tache;
}

export async function terminerTache(id: number): Promise<TacheType> {
    const resultat = await envoyerRequete(`/taches/${id}/terminer`, {
        method: "PATCH",
    });

    return (resultat as { tache: TacheType }).tache;
}

export async function reactiverTache(id: number): Promise<TacheType> {
    const resultat = await envoyerRequete(`/taches/${id}/reactiver`, {
        method: "PATCH",
    });

    return (resultat as { tache: TacheType }).tache;
}

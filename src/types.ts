export interface TacheType {
    id: number;
    texte: string;
    terminee: boolean;
    utilisateur_id: number;
}
export interface Utilisateur {
    id: number;
    nom: string;
    email: string;
}
export interface ReponseConnexion {
    message: string;
    token: string;
    utilisateur: Utilisateur;
}
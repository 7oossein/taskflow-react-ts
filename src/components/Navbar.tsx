import type { Utilisateur } from "../types";
function Navbar() {
    const utilisateur: Utilisateur|null = JSON.parse(
        localStorage.getItem("utilisateur") || "null",
    );

    function deconnexion() {
        localStorage.removeItem("token");
        localStorage.removeItem("utilisateur");
        localStorage.removeItem("taches");
        window.location.href = "/connexion";
    }

    return (
        <nav>
            <h2>TaskFlow</h2>

            <span>{utilisateur?.nom || "Utilisateur"}</span>

            <button onClick={deconnexion}>Déconnexion</button>
        </nav>
    );
}

export default Navbar;

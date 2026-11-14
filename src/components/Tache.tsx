import React, { useState } from "react";

import {
    modifierTache,
    supprimerTache,
    terminerTache,
    reactiverTache,
} from "../services/api";

import type { TacheType } from "../types";

interface TacheProps {
    tache: TacheType;
    afficherMessage: (texte: string, type?: string) => void;
    mettreAJourTaches: React.Dispatch<React.SetStateAction<TacheType[]>>;
}

function Tache({ tache, afficherMessage, mettreAJourTaches }: TacheProps) {
    const [edition, setEdition] = useState(false);
    const [nouveauTexte, setNouveauTexte] = useState(tache.texte);

    // Enregistrer une modification
    async function enregistrerModification(
        event: React.SubmitEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();

        const texte = nouveauTexte.trim();

        if (!texte) {
            afficherMessage("Le texte ne peut pas être vide.");
            return;
        }

        try {
            const resultat = await modifierTache(tache.id, texte);

            mettreAJourTaches((anciennes) =>
                anciennes.map((ancienne) =>
                    ancienne.id === tache.id ? resultat : ancienne,
                ),
            );

            setEdition(false);
            afficherMessage("Tâche modifiée avec succès !", "succes");
        } catch (erreur) {
            if (erreur instanceof Error) {
                afficherMessage(erreur.message);
            } else {
                afficherMessage("Une erreur inconnue est survenue.");
            }
        }
    }

    // Supprimer une tâche
    async function supprimer(): Promise<void> {
        try {
            await supprimerTache(tache.id);

            mettreAJourTaches((anciennes) =>
                anciennes.filter((ancienne) => ancienne.id !== tache.id),
            );

            afficherMessage("Tâche supprimée avec succès !", "succes");
        } catch (erreur) {
            if (erreur instanceof Error) {
                afficherMessage(erreur.message);
            } else {
                afficherMessage("Une erreur inconnue est survenue.");
            }
        }
    }

    // Terminer ou réactiver une tâche
    async function changerEtat(): Promise<void> {
        try {
            const resultat = tache.terminee
                ? await reactiverTache(tache.id)
                : await terminerTache(tache.id);

            mettreAJourTaches((anciennes) =>
                anciennes.map((ancienne) =>
                    ancienne.id === tache.id ? resultat : ancienne,
                ),
            );

            afficherMessage(
                resultat.terminee
                    ? "Tâche terminée avec succès !"
                    : "Tâche réactivée avec succès !",
                "succes",
            );
        } catch (erreur) {
            if (erreur instanceof Error) {
                afficherMessage(erreur.message);
            } else {
                afficherMessage("Une erreur inconnue est survenue.");
            }
        }
    }

    return (
        <li className={`tache-item ${tache.terminee ? "terminee" : ""}`}>
            {edition ? (
                <form
                    onSubmit={enregistrerModification}
                    className="tache-edition"
                >
                    <input
                        type="text"
                        value={nouveauTexte}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => setNouveauTexte(event.target.value)}
                        autoFocus
                    />

                    <button type="submit">Enregistrer</button>

                    <button
                        type="button"
                        className="btn-annuler"
                        onClick={() => {
                            setNouveauTexte(tache.texte);
                            setEdition(false);
                        }}
                    >
                        Annuler
                    </button>
                </form>
            ) : (
                <>
                    <div className="tache-contenu">
                        <button
                            className="btn-check"
                            onClick={changerEtat}
                            title="Changer le statut"
                        >
                            {tache.terminee ? "✓" : ""}
                        </button>

                        <span className="tache-texte">{tache.texte}</span>

                        <span className="tache-statut">
                            {tache.terminee ? "Terminée" : "En cours"}
                        </span>
                    </div>

                    <div className="tache-actions">
                        <button
                            className="btn-modifier"
                            onClick={() => {
                                setNouveauTexte(tache.texte);
                                setEdition(true);
                            }}
                        >
                            Modifier
                        </button>

                        <button className="btn-supprimer" onClick={supprimer}>
                            Supprimer
                        </button>
                    </div>
                </>
            )}
        </li>
    );
}

export default Tache;

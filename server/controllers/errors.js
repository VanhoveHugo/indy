const Errors = {
    internalServerError: (res) => {
        res.status(500).send('Le serveur a rencontré une erreur interne')
    },
    pageNotFound: (res) => {
        res.status(404).send('La page demandée n\'existe pas')
    },
    noContent: (res) => {
        res.status(204).send('La requête a été traitée avec succès mais ne renvoie pas de contenu')
    }
}

module.exports = Errors
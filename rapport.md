# Rapport du test technique

## Liste des bugs découverts 

| Page               | Description                                                                                                                                             | fix |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| Global             | Les formulaires avec un champ demandant un mail ne vérifient pas que l'entrée de l'utilisateur est valide                                               |     |
| Sign Up/Formulaire | Le passage du formulaire Sign in au formulaire Sign up fait fonctionner le formulaire Sign in sans raison.                                              |     |
| People/New User    | Le formulaire accepte la création d'un nouvel utisateur sans nom                                                                                        |     |
| People/New User    | Le formulaire ne sauvegarde pas le nom entré par l'utilisateur                                                                                          |     |
| People/Update User | Le bouton "Update" du formulaire ne fonctionne pas                                                                                                      |     |
| Project/Update     | L'utilisateur reçoit un message d'erreur "Cannot read properties of undefined (reading 'toString')" en souhaitant modifier un projet existant           | ;)  |
| Project/Update     | L'utilisateur reçoit un message d'erreur "Cannot read properties of undefined (reading 'toString')" en souhaitant modifier un projet existant           | ;)  |
| Project/Update     | Les informations du projet ne sont pas affichés                                                                                                         | ;)  |
| Activities         | Lorsque l'utilisateur ajoute une nouvel activité sur le mois prochain, après avoir appuyé sur le bouton "Save", il reçoit une erreur "rejectionHandler" |     |

## Liste des améliorations UX


| Page                | Description                                                                                                                                                                            | fix |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----| 
| Global              | Le message renvoyé en cas d'erreur manque de précision : "Some errors"                                                                                                                 |     |  
| Global              | Les éléments HMTL options des selectors ont un CSS assez cru comparé au reste de l'UI                                                                                                  |     | 
| Global              | Le logo sur le header est relativement discret et peu visible                                                                                                                          |     |  
| Sign Up/Formulaire  | Lorsque l'utilisateur rentre son mot de passe, il n'est pas indiqué qu'il est nécessaire d'avoir un mdp avec des contraintes (un chiffre...)                                           |     |
| People              | Le logo '...' présent sur les cases correspondant aux users donne l'impression qu'il faut cliquer dessus pour modifier un user                                                         |     |
| People/New User     | Le champ du mot de passe affiche en clair l'entrée de l'utilisateur                                                                                                                    |     |
| People/Update User  | Les champs demandant une entrée spécifique (numériques, mail) ne vérifient pas la validité des entrées                                                                                 |     |
| Project/New Project | La liste de projet n'est pas mise à jour après la création d'un nouveau projet                                                                                                         |     |
| Activities          | Le champ permettant de laisser un commentaire ne permet de commenter un projet pour l'intégralité du mois. Il serait plus intéressant d'avoir un commentaire sur la journée par projet |     |
| Activities          | Il y a deux sélectors pour filtrer par projet, on peut en supprimer un pour supprimer cette répétition                                                                                 |     |

## Idées de fonctionnalités 

| Page     | Description                                                                                                                                                                            | fix |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----| 
| Sign in  | L'utilisateur peut se connecter à l'aide de son mail |     |





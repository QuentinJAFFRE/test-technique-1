# Rapport du test technique

## Liste des bugs découverts 

| Page               | Description                                                                                                                                                                                  | fix |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| Global             | Les formulaires avec un champ demandant un mail ne vérifient pas que l'entrée de l'utilisateur est valide. De même, il n'est pas nécessaire d'avoir un champ rempli pour le nom d'utilisateur| ;)  |
| Sign In/Formulaire | Le formulaire ne fonctionne pas                                                                                                                                                              | ;)  |
| People/New User    | Le formulaire ne sauvegarde pas le nom entré par l'utilisateur                                                                                                                               | ;)  |
| People/Update User | Le bouton "Update" du formulaire ne fonctionne pas                                                                                                                                           | ;)  |
| Project/Update     | L'utilisateur reçoit un message d'erreur "Cannot read properties of undefined (reading 'toString')" en souhaitant modifier un projet existant                                                | ;)  |
| Project/Update     | Les informations du projet ne sont pas affichés                                                                                                                                              | ;)  |
| Account            | Lorsque l'utilisateur modifie le champs email, la modification n'est pas prise en compte                                                                                                     | ;)  |

## Liste des améliorations UX

| Page                | Description                                                                                                                                                                                                                                                   | fix |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----| 
| Global              | Le message renvoyé en cas d'erreur manque de précision : "Some errors"                                                                                                                                                                                        | x   |  
| Global              | Lors de l'update d'un model, on ne revient pas au menu principal                                                                                                                                                                                              | ;)  |  
| Global              | Les éléments HMTL options des selectors ont un CSS assez cru comparé au reste de l'UI                                                                                                                                                                         | x   | 
| Global              | Le logo sur le header est relativement discret et peu visible                                                                                                                                                                                                 | ;)  |  
| Sign Up/Formulaire  | Le passage du formulaire Sign in au formulaire Sign up fait mettre à jour les messages d'erreur du formulaire Sign In                                                                                                                                         | ;)  |
| Sign Up/Formulaire  | Lorsque l'utilisateur rentre son mot de passe, il n'est pas indiqué qu'il est nécessaire d'avoir un mdp avec des contraintes (au moins 6 caractères)                                                                                                          | ;)  |
| People              | Le logo '...' présent sur les cases correspondant aux users donne l'impression qu'il faut cliquer dessus pour modifier un user                                                                                                                                | ;)  |
| People/New User     | Le champ du mot de passe affiche en clair l'entrée de l'utilisateur                                                                                                                                                                                           | ;)  |
| Project/New Project | La liste de projet n'est pas mise à jour après la création d'un nouveau projet                                                                                                                                                                                | ;)  |
| Activities          | Il y a deux sélectors pour filtrer par projet, on peut en supprimer un pour supprimer cette répétition                                                                                                                                                        | ;)  |
| Activities          | Il n'y pas de possibilité d'enlever facilement de la liste un projet. On peut donc remplacer l'emplacement du bouton "supprimer un projet" par un bouton permettant de le retirer de la liste (la fonctionnalité de suppression existe dans la partie Projet) | ;)  |


## Idées de fonctionnalités 

| Page     | Description                                                           | fix |
|----------|-----------------------------------------------------------------------|-----| 
| Sign in  | L'utilisateur peut se connecter à l'aide de son mail                  | ;)  |
| Sign up  | L'utilisateur peut optionnellement ajouter son mail dès l'inscription | ;)  |
| Sign up  | L'utilisateur doit entrer un mdp fort                                 | ;)  | 
| Sign up  | L'utilisateur doit choisir un identifiant qui n'existe pas encore     | ;)  |
| Sign up  | L'utilisateur peut afficher son mot de passe en clair                 | ;)  |

## Résolution de bugs

Chaque commits correspond à la résolution d'un bug ou d'une fonctionnalité. En général, les bugs étaient dues à la mauvaise manipulation d'objet.

J'ai donc corrigé ces bugs en comprenant la forme des objets utilisés dans le code à l'aide de la fonction : console.log. 

## Ajout de fonctionnalités
Les fonctionnalités ajoutées sont des fonctionnalités de bon sens qui facilitent la vie de l'utilisateur lors de son arrivée sur l'application web.

## Remarques

Le code était très simple à comprendre, avec, pour le front end, un fichier par vue. Et puis, au niveau du backend, une architecture très proche de la clean architecture.

De plus, le front est facile à comprendre avec les RestrictedRoute dans le fichier app.js qui renvoie au index.js : les services de l'app sont bien découpés et isolés. 

Il aurait peut-être intérressant de créer un composant générique pour les champs des formulaires afin d'aléger le code des formulaires.
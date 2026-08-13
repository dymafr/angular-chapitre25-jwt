# Authentification par jeton JWT

Ce projet contient deux applications :

- `api` : une API `Express` qui signe et vérifie les jetons `JWT` avec l'algorithme `RS256` ;
- `client` : l'application `Angular` qui consomme cette API.

## Génération de la paire de clés

L'API signe les jetons avec une clé privée `RSA` et les vérifie avec la clé publique
correspondante. **Ces deux fichiers ne sont pas versionnés** : générez-les vous-même après
avoir cloné le projet.

Placez-vous dans le dossier `api/keys`, puis générez la clé privée :

```bash
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
```

Faites deux fois Entrée pour ne pas ajouter de mot de passe.

Créez ensuite la clé publique à partir de la clé privée :

```bash
ssh-keygen -e -m PEM -f jwtRS256.key > jwtRS256.key.pub
```

Vous pouvez obtenir le même résultat avec `openssl` :

```bash
openssl genrsa -traditional -out jwtRS256.key 4096
openssl rsa -in jwtRS256.key -RSAPublicKey_out -out jwtRS256.key.pub
```

Les deux fichiers sont lus en `utf8` par `api/keys/index.js`. Si vous êtes sous `Windows`,
générez la clé publique depuis `Git Bash` ou `WSL` : une redirection faite depuis `PowerShell`
écrit le fichier en `UTF-16` et la vérification du jeton échouerait.

La clé privée ne doit jamais être partagée ni versionnée.

## Lancement de l'API

```bash
cd api
npm install
npm start
```

L'API écoute sur le port `3001`.

## Lancement du client

```bash
cd client
npm install
npm start
```

L'application est servie sur `http://localhost:4200` et les appels commençant par `/api`
sont redirigés vers l'API grâce au fichier `client/proxy.conf.json`.

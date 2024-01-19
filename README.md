# Mon soutien psy

| :exclamation:  Projet transféré à la CNAM |
|-------------------------------------------|

https://www.ameli.fr/assure/remboursements/rembourse/seances-avec-un-psychologue

~~https://monsoutienpsy.sante.gouv.fr~~

## Run locally

First you need to run a docker with a postgre DB

```
  cp .env.test .env
  docker-compose up
```

then you need to prepare the project

```
  yarn
  yarn run db:init
```

and finally you can run the project locally with

```
  yarn run dev
```

## Fetch data from démarches simplifiées

If a docker has been run with seed data, first clear it

```
docker-compose down
docker volume rm mon-psy-sante_db_data
docker-compose up
yarn run db:migrate

```

Run the cron to import data

```
DEMARCHES_SIMPLIFIEES_TOKEN=XXX DEMARCHES_SIMPLIFIEES_ID=52209
yarn cron:launch importFromDS
```

To re-run the migration from 0

- DROP public schema
- recreate public schema
- RUN

      grant usage on schema public to public;
      grant create on schema public to public;
      CREATE EXTENSION postgis;

## To update sealed secret

https://socialgouv.github.io/sre-tools/

## How to connect app to db on bastion

- open ssh tunnel :

```
ssh -l localhost:54320:<server>.postgres.database.azure.com:5432 <USER>@fabrique-bastion
```

- dans la connection Sequelize, deactivate ssl :

```
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
```

- set la var d'env DATABASE_URL pour pointer vers localhost et le protocole est `postgre`:

```
DATABASE_URL=postgres://<USER_NAME>:<PASSWORD>@localhost:54320/prod
```

## Configure keycloak on local

run
docker-compose up

- go to http://localhost:8080/admin/master/console/#/create/realm
- click import > config/keycloak/mon-psy-sante-realm.json
- then create users : users > Add user

### Use keycloak API

- get the Admin-cli client secret on the keycloak admin console
- get the keycloak url on rancher

#### Get an API token by running

```
curl --location --request POST '<KEYCLOAK_URL>/auth/realms/mon-psy-sante/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=admin-cli' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'client_secret=<THE SECRET>' \
--data-urlencode 'scope=openid'
```

- récuperer l'`access_token` retourné et l'ajouter à toutes les requêtes sous forme de Bearer token

#### Get all users

```
    curl --location --request GET '<KEYCLOAK_URL>/auth/admin/realms/mon-psy-sante/users' \
    --header 'Authorization: Bearer <ACCESS_TOKEN>'
```

#### Create new users

```
curl --location --request POST '<KEYCLOAK_URL>/auth/admin/realms/mon-psy-sante/users' \
--header 'Authorization: Bearer <ACCESS_TOKEN>'
--header 'Content-Type: application/json' \
--data-raw '{
        "username": "Test",
        "email": "hello@test.com",
        "enabled": true,
         "emailVerified": false,
        "disableableCredentialTypes": [],
        "requiredActions": ["UPDATE_PASSWORD"],
        "attributes": {"department":"31"},
        "groups": ["CPAM"],
        "credentials":[{"type":"password","value":"Mon password","temporary":true}]
    }'
```

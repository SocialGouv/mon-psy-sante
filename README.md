# MonPsy

https://monpsy.sante.gouv.fr

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
yarn cron:launch importData
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

## Configure keycloak on local

run
docker-compose up

go to http://localhost:8080/admin/master/console/#/create/realm
click import > config/keycloak/mon-psy-sante-realm.json

then create users : users > Add user

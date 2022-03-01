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

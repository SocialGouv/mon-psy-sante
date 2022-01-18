# MonPsySanté

https://monpsy.sante.gouv.fr

# Run locally

First you need to run a docker with a postgre DB
```
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


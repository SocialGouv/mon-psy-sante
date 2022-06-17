# GraphQL Queries

https://www.demarches-simplifiees.fr/graphql

## Auth

In Header :

```
{
  "Authorization": "Bearer XXX",
}
```

## Variable

```
 {
  "demarcheNumber": 52209
 }
```

## Get all instructor groups

```
query getGroupeInstructeurs($demarcheNumber: Int!) {
  demarche(number: $demarcheNumber) {
    id
    number
    title
    groupeInstructeurs {
      id
      number
      label
      instructeurs {
        id
        email
      }
    }
  }
}
```

## Get all folders

```
query getGroupeDossier($demarcheNumber: Int!) {
      demarche (number: $demarcheNumber) {
        id
        dossiers {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
              archived
              number
              groupeInstructeur {
                id
                label
              }
              state
              champs {
                id
                label
                stringValue
              }
              usager {
                email
              }
              demandeur {
                ... on PersonnePhysique {
                  civilite
                  nom
                  prenom
                }
              }
          }
        }
      }
    }
```

```
query getGroupeDossiersWithAnnotations($demarcheNumber: Int!) {
  demarche (number: $demarcheNumber) {
     id
        dossiers {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            champs {
              id
              label
              stringValue
            }
            annotations {
              id
              label
              stringValue
            }
            demandeur {
              ... on PersonnePhysique {
                nom
                prenom
              }
            }
          }
        }
      }
    }
  }
}
```

# SQL Queries

Nettoyage des psy qui ont mis leur nom et prénom dans le champ cdsmsp.

```sql
update psychologist
set cdsmsp = null
where cdsmsp = ''
  or cdsmsp ilike last_name || ' ' || '%'
  or cdsmsp ilike '%' || ' ' || last_name
  or cdsmsp
```

# GraphQL Queries

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

# Nuxt API Prisma

## Routes API

### POST http://localhost:4000/persons
```json
{
  "firstname": "Thomas",
  "lastname": "Bnt",
  "birthday": "1999-01-01T00:00:00.000Z",
  "jobs": [
    {
      "job": "CW",
      "position": "Dev",
      "start": "2023-01-30T00:00:00.000Z",
      "end": null
    }
  ]
}
```

### GET http://localhost:4000/list

```json
{
  "list": [
    {
      "id": 1,
      "firstname": "Thomas",
      "lastname": "Bnt",
      "birthday": "1999-01-10T00:00:00.000Z",
      "jobs": [
        {
          "id": 1,
          "job": "jkljk",
          "position": "jkljklj",
          "start": "2025-01-30T00:00:00.000Z",
          "end": "2025-01-30T00:00:00.000Z",
          "user_id": 1
        }
      ]
    },
  ]
}
```

# Resource API Documentation

## Endpoints

### 1. Create Resource

- **Endpoint:** `/api/trpc/resources.create`
- **Method:** `POST`
- **Description:** Creates a new Resource.
- **Input Schema:** `ResourceSchema`
- **Example Request:**

```json
{
  "json": {
    "questionId": 1,
    "link": "pretend this is a link"
  }
}
```

- **Example Response:**

```json
{
  "result": {
    "data": {
      "json": [
        {
          "id": 2,
          "questionId": 1,
          "link": "pretend this is a link"
        }
      ]
    }
  }
}
```

### 2. Read Resource

- **Endpoint:** `/api/trpc/resources.read`
- **Method:** `Get`
- **Description:** Retrieves resouces associated with a specific question.
- **Input Schema:** `string` (Question Id)
- **Example Request:**

```json
localhost:3000/api/trpc/resources.read?input={"json":1}
```

- **Example Response:**

```json
{
  "result": {
    "data": {
      "json": [
        {
          "id": 1,
          "questionId": 1,
          "link": "pretend updated link"
        },
        {
          "id": 2,
          "questionId": 1,
          "link": "pretend this is a link 2"
        }
      ]
    }
  }
}
```

### 3. Update Resource

- **Endpoint:** `/api/trpc/resources.update`
- **Method:** `POST`
- **Description:** Updates details of an existing resource.
- **Input Schema:** `UpdateResourceSchema`
- **Example Request:**

```json
{
  "json": {
    "id": 1,
    "questionId": 1,
    "link": "pretend updated link"
  }
}
```

- **Example Response:**

```json
{
  "result": {
    "data": {
      "json": {
        "columns": [],
        "columnTypes": [],
        "rows": [],
        "rowsAffected": 1,
        "lastInsertRowid": null
      }
    }
  }
}
```

### 4. Delete Resource

- **Endpoint:** `/api/trpc/resources.delete`
- **Method:** `POST`
- **Description:** Deletes a resource
- **Input Schema:** `number` (resource Id)
- **Example Request:**

```json
{
  "json": 1
}
```

- **Example Response:**

```json
{
  "result": {
    "data": {
      "json": {
        "columns": [],
        "columnTypes": [],
        "rows": [],
        "rowsAffected": 1,
        "lastInsertRowid": null
      }
    }
  }
}
```

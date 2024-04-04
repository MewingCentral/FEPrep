# Comments API Documentation

## Endpoints

### 1. Create Comment

- **Endpoint:** `/api/trpc/comments.create`
- **Method:** `POST`
- **Description:** Creates a new comment.
- **Input Schema:** `CommentSchema`
- **Example Request:**

```json
{
  "json": {
    "questionId": 1,
    "userId": "tv9vgqk3uxkrj01",
    "content": "test comment"
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
          "id": 1,
          "questionId": 1,
          "userId": "tv9vgqk3uxkrj01",
          "content": "test comment"
        }
      ]
    }
  }
}
```

### 2. Read Comment

- **Endpoint:** `/api/trpc/comments.read`
- **Method:** `Get`
- **Description:** Retrieves comments associated with a specific question.
- **Input Schema:** `string` (Question Id)
- **Example Request:**

```json
localhost:3000/api/trpc/comments.read?input={"json":1}
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
          "userId": "tv9vgqk3uxkrj01",
          "content": "test comment"
        }
      ]
    }
  }
}
```

### 3. Update Comment

- **Endpoint:** `/api/trpc/comments.update`
- **Method:** `POST`
- **Description:** Updates details of an existing comment.
- **Input Schema:** `UpdateCommentSchema`
- **Example Request:**

```json
{
  "json": {
    "id": 1,
    "questionId": 1,
    "userId": "tv9vgqk3uxkrj01",
    "content": "test comment edit"
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

### 4. Delete Comment

- **Endpoint:** `/api/trpc/comments.delete`
- **Method:** `POST`
- **Description:** Deletes a comment
- **Input Schema:** `number` (Comment Id)
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

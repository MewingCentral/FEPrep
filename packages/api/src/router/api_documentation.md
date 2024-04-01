# Flashcards API Documentation

## Endpoints

### 1. Create Pack

- **Endpoint:** `/api/trpc/flashcards.createPack`
- **Method:** `POST`
- **Description:** Creates a new flashcard pack.
- **Input Schema:** `FlashCardPackSchema`
- **Example Request:**

```json
{
  "json": {
    "name": "Testing",
    "userId": "tv9vgqk3uxkrj01"
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
          "name": "Testing",
          "userId": "tv9vgqk3uxkrj01"
        }
      ]
    }
  }
}
```

### 2. Create Card

- **Endpoint:** `/api/trpc/flashcards.createCard`
- **Method:** `POST`
- **Description:** Adds a new flashcard to an existing pack.
- **Input Schema:** `FlashCardSchema`
- **Example Request:**

```json
{
  "json": {
    "packId": 1,
    "front": "front text",
    "back": "back text"
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
          "id": 5,
          "packId": 1,
          "front": "front text",
          "back": "back text"
        }
      ]
    }
  }
}
```

### 3. Read Pack

- **Endpoint:** `/api/trpc/flashcards.readPack`
- **Method:** `POST`
- **Description:** Retrieves flashcard packs associated with a specific user.
- **Input Schema:** `string` (User ID)
- **Example Request:**

```json
{
  "json": "tv9vgqk3uxkrj01"
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
          "name": "Testing",
          "userId": "tv9vgqk3uxkrj01"
        }
      ]
    }
  }
}
```

### 4. Read Cards

- **Endpoint:** `/api/trpc/flashcards.readCards`
- **Method:** `POST`
- **Description:** Retrieves flashcards within a specified pack.
- **Input Schema:** `number` (Pack ID)
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
      "json": [
        {
          "id": 1,
          "packId": 1,
          "front": "front textttt",
          "back": "back texttttt"
        },
        {
          "id": 2,
          "packId": 1,
          "front": "front tet",
          "back": "back tett"
        }
      ]
    }
  }
}
```

### 5. Update Pack

- **Endpoint:** `/api/trpc/flashcards.updatePack`
- **Method:** `POST`
- **Description:** Updates details of an existing flashcard pack.
- **Input Schema:** `UpdatePackSchema`
- **Example Request:**

```json
{
  "json": {
    "packId": 1,
    "name": "new name",
    "userId": "tv9vgqk3uxkrj01"
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

### 6. Update Card

- **Endpoint:** `/api/trpc/flashcards.updateCard`
- **Method:** `POST`
- **Description:** Updates details of an existing flashcard.
- **Input Schema:** `UpdateCardSchema`
- **Example Request:**

```json
{
  "json": {
    "id": 1,
    "packId": 1,
    "front": "new front",
    "back": "new back"
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

### 7. Delete Pack

- **Endpoint:** `/api/trpc/flashcards.deletePack`
- **Method:** `POST`
- **Description:** Deletes a flashcard pack and its associated cards.
- **Input Schema:** `number` (Pack ID)
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

### 8. Delete Card

- **Endpoint:** `/api/trpc/flashcards.deleteCard`
- **Method:** `POST`
- **Description:** Deletes a specific flashcard.
- **Input Schema:** `number` (Card ID)
- **Example Request:**

```json
{
  "json": 2
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

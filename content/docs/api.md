# Pulse API Documentation

The Pulse API provides endpoints for sending push notifications, managing user data, and integrating with external MySQL databases. The API follows REST principles and uses JSON for request and response data.

## Base URL

The base URL for all API endpoints is:

```
https://pulse.fgx.webally.co.za/api/
```

## Authentication

To authenticate requests to the Pulse API, include an API key in the `X-API-Key` header of each request. You can obtain an API key by signing up for a Pulse account and generating a key in the dashboard.

Example:

```conf
X-API-Key: your_api_key
```

## Endpoints

### Send Notification

Send a push notification to a specific user or a group of users.

- **URL:** `/notifications/send`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "title": "Notification Title",
    "body": "Notification message",
    "user_id": 123,
    "group_id": 456,
    "deep_link": "app://example/page"
  }
  ```
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
```json
{
"status": "success",
"message": "Notification sent successfully"
}
```

### Register User

Register a new user in the Pulse system.

- **URL:** `/users/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "secret",
    "device_token": "abcdefgh12345"
  }
  ```
- **Response:**
  - **Status Code:** 201 Created
  - **Body:**
```json
{
"status": "success",
"message": "User registered successfully",
"user_id": 123
}
```

### Authenticate User

Authenticate a user and obtain an access token.

- **URL:** `/users/authenticate`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "secret"
  }
  ```
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
```json
{
"status": "success",
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get User Details

Retrieve details of a specific user.

- **URL:** `/users/{user_id}`
- **Method:** `GET`
- **Request Parameters:**
  - `user_id` (required): The ID of the user.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
```json
{
"status": "success",
"user": {
   "id": 123,
   "username": "johndoe",
   "email": "john@example.com",
   "device_tokens": ["abcdefgh12345"]
}
}
    ```

### Update User

Update details of a specific user.

- **URL:** `/users/{user_id}`
- **Method:** `PUT`
- **Request Parameters:**
  - `user_id` (required): The ID of the user.
- **Request Body:**
```json
{
   "username": "johndoe_updated",
   "email": "john.updated@example.com"
}
```
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
```json
{
"status": "success",
"message": "User details updated successfully"
}
```

### Delete User

Delete a specific user.

- **URL:** `/users/{user_id}`
- **Method:** `DELETE`
- **Request Parameters:**
  - `user_id` (required): The ID of the user.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
```json
{
"status": "success",
"message": "User deleted successfully"
}
```

### Get Notification History

Retrieve the notification history for a specific user.

- **URL:** `/notifications/{user_id}`
- **Method:** `GET`
- **Request Parameters:**
  - `user_id` (required): The ID of the user.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
```json
{
"status": "success",
"notifications": [
   {
      "id": 789,
      "title": "Notification 1",
      "body": "Notification message 1",
      "sent_at": "2023-06-10T10:30:00Z"
   },
   {
      "id": 790,
      "title": "Notification 2",
      "body": "Notification message 2",
      "sent_at": "2023-06-11T15:45:00Z"
   }
]
}
```

### Get Engagement Metrics

Retrieve user engagement metrics for a specific notification.

- **URL:** `/notifications/{notification_id}/metrics`
- **Method:** `GET`
- **Request Parameters:**
  - `notification_id` (required): The ID of the notification.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
```json
{
   "status": "success",
   "metrics": {
      "sent": 1000,
      "delivered": 980,
      "opened": 750,
      "clicked": 500
   }
}
```

## Error Responses

The API may return the following error responses:

- **400 Bad Request:** The request is invalid or missing required parameters.
- **401 Unauthorized:** The API key is missing or invalid.
- **404 Not Found:** The requested resource does not exist.
- **500 Internal Server Error:** An unexpected error occurred on the server.

Error responses will have the following format:

```json
{
  "status": "error",
  "message": "Error message describing the issue"
}
```

## Rate Limiting

The Pulse API imposes rate limits to prevent abuse and ensure fair usage. The rate limits are as follows:

- **Limit:** 100 requests per minute
- **Limit:** 5000 requests per hour

If you exceed the rate limits, you will receive a `429 Too Many Requests` response. Please wait for the specified time before making further requests.

## Webhooks

The Pulse API supports webhooks for receiving real-time updates and notifications. You can configure webhooks in the Pulse dashboard to receive events such as user registration, notification delivery, and user engagement.

When an event occurs, the Pulse API will send a POST request to your specified webhook URL with the event details in the request body.

## Support

If you have any questions, issues, or need assistance with the Pulse API, please contact our support team at support@fgx.com. We're here to help!

Happy coding with the Pulse API!
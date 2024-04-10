# API Development Request

I am seeking assistance in developing a comprehensive RESTful API designed to facilitate communication and data management across various applications. The API will serve as a central hub for sending push notifications, managing user data, and integrating with external MySQL databases, with a specific focus on maintaining user and group information. This API is crucial for enhancing user engagement and streamlining data synchronization processes across multiple platforms.

## API Overview and Functionality
- The API aims to centralize the sending of push notifications to users of different applications, store and manage device IDs, and keep a history of all notifications sent.
- It will connect to various MySQL databases to synchronize user data, supporting different database schemas through configurable mapping. (See Config file Versions below)
- The API will be accessible via HTTP and include CLI support for administrative tasks.
- Authentication for both the API and users is paramount, with API access controlled via API keys.
- A modular, class-based design in Flask will be employed to ensure scalability and maintainability.

## Config file versions
The two versions of the config file for FGX Pulse cater to different architectural designs for handling user-group relationships within a client's database system. These configurations enable FGX Pulse to adapt to the specific schema of each client, such as "Pioneer," by detailing how to map their unique database structures to the expected schema of FGX Pulse. Below, we delve into the specifics and advantages of each version:

### Version 1: Group ID in Users Table (`userTableGroupId`)

This version of the config file is designed for scenarios where each user's group affiliation is directly indicated within the users table itself, through a groupId column. This approach is straightforward and suits simpler database schemas where users are primarily associated with a single group.

```json
{
  "configVersion": "userTableGroupId",
  "appName": "YourAppName",
  "database": {
    "host": "localhost",
    "port": 3306,
    "databaseName": "your_app_db",
    "username": "db_user",
    "password": "db_password"
  },
  "userTable": {
    "tableName": "users",
    "mappings": {
      "userId": "id",
      "username": "username",
      "email": "email",
      "deviceIds": "device_ids",
      "groupId": "group_id"
    }
  },
  "firebaseSettings": {
    "projectId": "your_global_firebase_project_id",
    "privateKey": "your_global_firebase_private_key",
    "clientEmail": "your_global_firebase_client_email"
  }
}
```

### Version 2: Group Information in a Linking Table (`linkingTable`)

This config file version supports a more complex database schema where users and groups are associated through a separate linking table. This approach is commonly used in many-to-many relationships, allowing a user to belong to multiple groups.

```json
{
  "configVersion": "linkingTable",
  "appName": "YourAppName",
  "database": {
    "host": "localhost",
    "port": 3306,
    "databaseName": "your_app_db",
    "username": "db_user",
    "password": "db_password"
  },
  "userTable": {
    "tableName": "users",
    "mappings": {
      "userId": "id",
      "username": "username",
      "email": "email",
      "deviceIds": "device_ids"
    }
  },
  "groupLinkingTable": {
    "tableName": "user_groups_link",
    "mappings": {
      "userId": "user_id",
      "groupId": "group_id"
    }
  },
  "firebaseSettings": {
    "projectId": "your_global_firebase_project_id",
    "privateKey": "your_global_firebase_private_key",
    "clientEmail": "your_global_firebase_client_email"
  }
}
```

## Key Features and Requirements
- **API Authentication:** Implement API key-based authentication to secure access.
- **User Authentication:** Details on user authentication mechanisms, if applicable.
- **Database Connectivity:** Support for connecting to external MySQL databases, with table and column mapping. An example config file should be provided to demonstrate the setup.
- **Application Management:** CRUD operations for application registration, including config file generation and connection testing.
- **Group and User Management:** Comprehensive support for managing users and groups, including CRUD operations and maintaining associations between users and groups.
- **Device ID Maintenance:** Strategies for storing and updating device IDs for push notification purposes.
- **Firebase Integration:** Utilize the Firebase SDK for sending push notifications to both individual users and groups.
- **Message Sending:** Enable sending messages to users and groups, incorporating deep linking and message customization.
- **Advanced Group Management:** Integrate with an existing database to map pre-defined groups and associate users with groups via group IDs.
- **Reporting:** Generate reports on CRUD operations, message sending activities, and user engagement metrics per application, group, and user.
- **Error Handling and Logging:** Implement robust error handling, retry mechanisms, and detailed logging for each API function.

## Development Stages
1. Generate a detailed task list outlining all development activities.
2. Create a tree list of all files and modules to be developed, ensuring a modular and class-based architecture.
3. Develop the API incrementally, providing detailed documentation at each stage.

## Endpoints
The API will expose the following endpoints:

| Endpoint                           | Method | Description                                           | Headers                                           | Body Example (for POST/PUT requests)                                 |
|------------------------------------|--------|-------------------------------------------------------|---------------------------------------------------|---------------------------------------------------------------------|
| `/auth/register`                   | POST   | Registers a new API user                              | Content-Type: `application/json`                  | `{ "username": "newUser", "password": "newPassword", "email": "user@example.com" }` |
| `/auth/login`                      | POST   | Authenticates a user and returns an API key           | Content-Type: `application/json`                  | `{ "username": "newUser", "password": "newPassword" }`              |
| `/auth/api-keys`                   | GET/POST/DELETE    | Manages API keys (create, revoke)         | Authorization: `Bearer <API_KEY>`                 | POST to create: `{ "label": "newKey" }`                             |
| `/apps`                            | GET/POST/PUT/DELETE | Manages applications (list, register, update, delete) | Authorization: `Bearer <API_KEY>`, Content-Type: `application/json` | POST to register: `{ "appName": "ExampleApp", "database": { "host": "db.example.com", ... }, ... }` |
| `/apps/{app_id}/config`            | GET/PUT             | Retrieves or updates an application's configuration  | Authorization: `Bearer <API_KEY>`, Content-Type: `application/json` | PUT to update config: `{ "database": { "username": "updatedUser", ... }, ... }` |
| `/users`                           | GET/POST            | Lists or manages user records                         | Authorization: `Bearer <API_KEY>`, Content-Type: `application/json` | POST to add user: `{ "name": "John", "surname": "Doe", ... }`       |
| `/users/{user_id}`                 | GET/PUT/DELETE      | Retrieves, updates, or deletes a user                | Authorization: `Bearer <API_KEY>`, Content-Type: `application/json` | PUT to update user: `{ "name": "UpdatedName", "surname": "UpdatedSurname", ... }` |
| `/users/sync`                      | POST                | Triggers manual synchronization of user data         | Authorization: `Bearer <API_KEY>`                 | `{ "syncNow": true }`                                                |
| `/users/search`                    | POST                | Searches for users based on criteria                  | Authorization: `Bearer <API_KEY>`, Content-Type: `application/json` | `{ "searchTerm": "John" }`                                           |
| `/groups`                          | GET/POST/PUT/DELETE | Creates, lists, updates, and deletes user groups      | Authorization: `Bearer <API_KEY>`, Content-Type: `application/json` | POST to create group: `{ "groupName": "NewGroup", "userIds": ["userId1", ...] }` |
| `/groups/{group_id}/users`         | GET                 | Lists users in a specific group                       | Authorization: `Bearer <API_KEY>`                 |                                                                       |
| `/messages/send/user/{user_id}`    | POST                | Sends a message to a specific user                    | Authorization: `Bearer <API_KEY>`, Content-Type: `application/json` | `{ "message": "Hello User", "deepLink": "exampleapp://feature" }`   |
| `/messages/send/group/{group_id}`  | POST                | Sends a message to all users in a group               | Authorization: `Bearer <API_KEY>`, Content-Type: `application/json` | `{ "message": "Hello Group", "deepLink": "exampleapp://group" }`    |
| `/messages/send/broadcast`         | POST                | Broadcasts a message to all users                     | Authorization: `Bearer <API_KEY>`, Content-Type: `application/json` | `{ "message": "General Announcement", "deepLink": "exampleapp://home" }` |
| `/messages/schedule`               | POST                | Schedules a message for later delivery                | Authorization: `Bearer <API_KEY>`, Content-Type: `application/json` | `{ "sendTime": "2023-12-01T12:00:00Z", "message": "Scheduled Message", ... }` |
| `/reports/notifications/history`   | GET                 | Retrieves a history of sent notifications             | Authorization: `Bearer <API_KEY>`                 |                                                                       |
| `/reports/users/registration`      | GET                 | Reports on user registrations over time               | Authorization: `Bearer <API_KEY>`                 |                                                                       |
| `/reports/messages/status`         | GET                 | Provides delivery status for messages                 | Authorization: `Bearer <API_KEY>`                 |                                                                       |
| `/reports/users/active`            | GET                 | Generates a report of active users                    | Authorization: `Bearer <API_KEY>`                 |                                                                       |
| `/reports/errors`                  | GET                 | Retrieves logs of errors encountered by the API       | Authorization: `Bearer <API_KEY>`                 |                                                                       |
| `/auth/register`                   | POST   | Registers a new API user                              | Content-Type: `application/json`                  | `{ "username": "newUser", "password": "newPassword", "email": "user@example.com" }` |
| `/users/{user_id}/device_tokens`   | POST   | Adds a device token for the user                      | Authorization: `Bearer <API_KEY>`; Content-Type: `application/json` | `{ "deviceToken": "abcdef123456" }` |
| `/users/{user_id}/device_tokens`   | DELETE | Removes a device token for the user                   | Authorization: `Bearer <API_KEY>`; Content-Type: `application/json` | `{ "deviceToken": "abcdef123456" }` |
| `/notifications/send`              | POST   | Sends a notification with rich content                | Authorization: `Bearer <API_KEY>`; Content-Type: `application/json` | `{ "target": "userId or topic", "message": { "title": "New Feature!", "body": "Check out our latest update.", "imageUrl": "https://example.com/image.png", "action": "OPEN_APP" } }` |
| `/topics/{topic}/subscribe`        | POST   | Subscribes a user to a topic                          | Authorization: `Bearer <API_KEY>`; Content-Type: `application/json` | `{ "userId": "12345" }` |
| `/topics/{topic}/unsubscribe`      | POST   | Unsubscribes a user from a topic                      | Authorization: `Bearer <API_KEY>`; Content-Type: `application/json` | `{ "userId": "12345" }` |
| `/reports/notifications`           | GET    | Retrieves analytics on notifications                  | Authorization: `Bearer <API_KEY>`                  | N/A |

This table provides a concise overview of the new endpoints introduced to manage device tokens, send rich content notifications, manage topic subscriptions, and access notification analytics within **FGX Pulse**. These endpoints enhance the API's functionality, allowing it to leverage Firebase's capabilities for a comprehensive notification management system.
### Comprehensive Endpoint Details

- **Headers**: 
  - `Content-Type: application/json` is required for any endpoint that accepts a body payload (primarily POST and PUT requests).
  - `Authorization: Bearer <API_KEY>` is essential for all endpoints to ensure that the requestor has been authenticated and is authorized to access the API.
  
- **Body Example**: Provided for endpoints where data submission is necessary. It's important to tailor the body payload to match the expected schema for each specific action (e.g., registering a new user, sending a message).

### Final Notes

This table serves as a template for designing, documenting, and implementing the REST API endpoints. Adapting this structure to fit the specific requirements of each endpoint will be crucial for developing a robust and effective API. Moreover, considering aspects like rate limiting, data validation, and response handling will further enhance the API's resilience and usability.

This API development project demands a thoughtful and systematic approach to ensure its success. I am looking for a comprehensive plan, starting with a detailed task list, followed by the structural organization of the API's components. Incremental documentation is required to facilitate understanding and future maintenance.



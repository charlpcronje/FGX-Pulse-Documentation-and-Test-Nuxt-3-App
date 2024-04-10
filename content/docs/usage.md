# Usage 

## Sending a Notification

To send a notification using the SDK, you can use the PulseService class:

```php
use Pulse\Services\PulseService;

$pulseService = new PulseService();

$title = 'New Notification';
$body = 'This is the notification message';
$userId = 123;

$pulseService->sendNotification($title, $body, $userId);
```

## Registering a User

To register a new user using the SDK, you can use the PulseService class:

```php
use Pulse\Services\PulseService;

$pulseService = new PulseService();

$username = 'johndoe';
$email = 'john@example.com';
$password = 'secret';
$deviceToken = 'abcdefgh12345';

$pulseService->registerUser($username, $email, $password, $deviceToken);
```

## Authenticating a User

To authenticate a user using the SDK, you can use the PulseService class:

```php
use Pulse\Services\PulseService;

$pulseService = new PulseService();

$email = 'john@example.com';
$password = 'secret';

$token = $pulseService->authenticateUser($email, $password);
```

## Retrieving User Details

To retrieve user details using the SDK, you can use the PulseService class:

```php
use Pulse\Services\PulseService;

$pulseService = new PulseService();

$userId = 123;

$userDetails = $pulseService->getUserDetails($userId);
```

## API Documentation

For detailed information about the available API endpoints, request parameters, and response formats, please refer to the Pulse API Documentation.
# Laravel SDK for Pulse API

This Laravel SDK provides a seamless integration with the Pulse API, allowing you to easily send push notifications and manage user data in your Laravel applications.

## APU Documentation

- Full [API Documentation](./docs/api.md)
- [API Endpoints](./docs/apiEndpoints.md) 
- [SDK Config](./docs/config.md)
- [Dependencies](./docs/dependencies.md)
- [SDK Usage](./docs/usage.md)

## Features

- User registration and authentication
- Sending notifications to individual users, groups, or multiple users
- Integration with external MySQL databases
- Deep linking in notifications
- Notification history tracking
- Detailed reporting on user engagement metrics

## Requirements

- PHP >= 7.3
- Laravel >= 8.0
- Guzzle HTTP client

## Installation

You can install the SDK via Composer. Run the following command in your Laravel project:

```bash
composer require fgx/pulse-sdk
```

Make sure your Laravel application meets the following requirements:

- PHP >= 7.3
- Laravel >= 8.0
- Guzzle HTTP client
  
After installing the package, you need to publish the configuration file by running the following command:

```sh
php artisan vendor:publish --provider="Pulse\PulseServiceProvider" --tag="config"
```

This will create a `config/pulse.php` file in your Laravel application. Update the configuration file with your Pulse API credentials and settings.
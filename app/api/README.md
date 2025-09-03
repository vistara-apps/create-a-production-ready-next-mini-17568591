# Base Mini App API Documentation

This document outlines the API endpoints available in the Base Mini App.

## Authentication

All API endpoints require authentication using a JWT token obtained after connecting your wallet.

### Headers

```
Authorization: Bearer <jwt_token>
```

## Endpoints

### User Profile

#### Get User Profile

```
GET /api/user/profile
```

Returns the user's profile information.

**Response**

```json
{
  "success": true,
  "data": {
    "address": "0x1234...",
    "displayName": "User123",
    "ensName": "user.eth",
    "profileImageUrl": "https://example.com/image.png",
    "farcasterId": "12345",
    "firstConnectedAt": 1632145678,
    "lastActiveAt": 1632145678
  }
}
```

#### Update User Profile

```
PUT /api/user/profile
```

Updates the user's profile information.

**Request Body**

```json
{
  "displayName": "NewName",
  "profileImageUrl": "https://example.com/new-image.png"
}
```

**Response**

```json
{
  "success": true,
  "data": {
    "address": "0x1234...",
    "displayName": "NewName",
    "ensName": "user.eth",
    "profileImageUrl": "https://example.com/new-image.png",
    "farcasterId": "12345",
    "firstConnectedAt": 1632145678,
    "lastActiveAt": 1632145678
  }
}
```

### Transactions

#### Get User Transactions

```
GET /api/transactions
```

Returns a list of the user's transactions.

**Query Parameters**

- `limit` (optional): Number of transactions to return (default: 10)
- `offset` (optional): Offset for pagination (default: 0)
- `status` (optional): Filter by status ('pending', 'confirmed', 'failed')

**Response**

```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "hash": "0xabcd...",
        "status": "confirmed",
        "blockNumber": 12345678,
        "timestamp": 1632145678,
        "from": "0x1234...",
        "to": "0x5678...",
        "value": "1000000000000000000",
        "gasUsed": "21000",
        "gasPrice": "20000000000"
      }
    ],
    "total": 42
  }
}
```

#### Get Transaction Details

```
GET /api/transactions/:hash
```

Returns details for a specific transaction.

**Response**

```json
{
  "success": true,
  "data": {
    "hash": "0xabcd...",
    "status": "confirmed",
    "blockNumber": 12345678,
    "timestamp": 1632145678,
    "from": "0x1234...",
    "to": "0x5678...",
    "value": "1000000000000000000",
    "gasUsed": "21000",
    "gasPrice": "20000000000"
  }
}
```

### Settings

#### Get User Settings

```
GET /api/user/settings
```

Returns the user's app settings.

**Response**

```json
{
  "success": true,
  "data": {
    "theme": "dark",
    "notifications": {
      "enabled": true,
      "transactionUpdates": true,
      "marketingUpdates": false
    },
    "privacy": {
      "shareAnalytics": true,
      "shareWalletActivity": false
    }
  }
}
```

#### Update User Settings

```
PUT /api/user/settings
```

Updates the user's app settings.

**Request Body**

```json
{
  "theme": "light",
  "notifications": {
    "marketingUpdates": true
  }
}
```

**Response**

```json
{
  "success": true,
  "data": {
    "theme": "light",
    "notifications": {
      "enabled": true,
      "transactionUpdates": true,
      "marketingUpdates": true
    },
    "privacy": {
      "shareAnalytics": true,
      "shareWalletActivity": false
    }
  }
}
```

## Error Handling

All API endpoints return a standard error format:

```json
{
  "success": false,
  "error": "Error message",
  "errorCode": 1001
}
```

### Common Error Codes

- `1001`: Authentication error
- `1002`: Invalid parameters
- `1003`: Resource not found
- `1004`: Rate limit exceeded
- `1005`: Server error

## Rate Limiting

API requests are limited to 100 requests per minute per user. When the rate limit is exceeded, the API will return a 429 status code with an error message.

## Webhooks

The API supports webhooks for real-time notifications. Configure webhooks in the developer dashboard.

### Webhook Events

- `transaction.pending`: Triggered when a transaction is pending
- `transaction.confirmed`: Triggered when a transaction is confirmed
- `transaction.failed`: Triggered when a transaction fails
- `user.login`: Triggered when a user logs in
- `user.update`: Triggered when a user updates their profile

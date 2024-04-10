## Analysis Report

| No. | File | Lines | Words | AI Tokens |
| --- | ---- | ----- | ----- | --------- |
| 1 | ./README.md | 76 | 131 | 170 |
| 2 | ./app.vue | 54 | 129 | 294 |
| 3 | ./package.json | 33 | 68 | 228 |
| 4 | ./tsconfig.json | 11 | 18 | 68 |
| 5 | ./tailwind.config.js | 14 | 20 | 86 |
| 6 | ./nuxt.config.ts | 42 | 86 | 148 |
| 7 | ./tree.md | 55 | 110 | 360 |
| 8 | ./public/endpoints.json | 1148 | 2489 | 6513 |
| 9 | ./server/tsconfig.json | 4 | 4 | 10 |
| 10 | ./server/api/login.post.ts | 32 | 107 | 170 |
| 11 | ./pages/index.vue | 10 | 26 | 68 |
| 12 | ./pages/login.vue | 66 | 192 | 393 |
| 13 | ./pages/documentation.vue | 5 | 9 | 27 |
| 14 | ./pages/test-endpoints.vue | 11 | 21 | 49 |
| 15 | ./pages/[...slug].vue | 5 | 8 | 23 |
| 16 | ./components/EndpointList.vue | 144 | 454 | 960 |
| 17 | ./components/DarkModeToggle.vue | 13 | 43 | 79 |
| 18 | ./components/TerminalEmulator.vue | 32 | 72 | 162 |
| 19 | ./components/LoadingOverlay.vue | 22 | 88 | 185 |
| 20 | ./assets/data/loaderItems.json | 22 | 100 | 219 |
| 21 | ./stores/loading.js | 36 | 99 | 165 |
| 22 | ./plugins/fetchLoading.js | 18 | 36 | 98 |
|  | Total | 1853 | 4310 | 10475 |


## Total Counts Across All Files. Tokenizer Used: NLTK's Punkt Tokenizer
- Total Lines: 1853
- Total Words: 4310
- Total AI Tokens: 10475

## File: README.md
```md
# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

```

## File: app.vue
```vue
<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 shadow">
      <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Pulse API Documentation</h1>
        <div class="flex space-x-4">
          <NuxtLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
            Documentation
          </NuxtLink>
          <NuxtLink to="/test-endpoints"
            class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
            Test Endpoints
          </NuxtLink>
        </div>
      </nav>
    </header>
    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
/* Importing main.css directly */
@import '~/assets/css/main.css';
</style>

<script setup>
import { useLoadingStore } from '~/stores/loading';
const loadingStore = useLoadingStore();
const router = useRouter();
const colorMode = useColorMode();

onBeforeMount(() => {
  if (process.client) {
    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken) {
      router.push('/login');
    }
  }
});

onBeforeMount(() => {
  loadingStore.startLoading('Loading page...', 1);
});

onMounted(() => {
  loadingStore.stopLoading();
});

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script>
```

## File: package.json
```json
{
  "name": "nuxt-app",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev --host",
    "generate": "nuxt generate --host",
    "preview": "nuxt preview --host",
    "postinstall": "nuxt prepare --host"
  },
  "dependencies": {
    "@nuxt/content": "^2.12.1",
    "@nuxtjs/axios": "^5.13.6",
    "@pinia/nuxt": "^0.5.1",
    "nuxt": "^3.11.2",
    "pinia": "^2.1.7",
    "shelljs": "^0.8.5",
    "vue": "^3.4.21",
    "vue-router": "^4.3.0",
    "xterm": "^5.3.0"
  },
  "devDependencies": {
    "@nuxt/types": "^2.17.3",
    "@nuxtjs/color-mode": "^3.3.3",
    "@nuxtjs/tailwindcss": "^6.11.4",
    "autoprefixer": "^10.4.19",
    "daisyui": "^4.10.1",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3"
  }
}

```

## File: tsconfig.json
```json
{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["./components/*"],
      "@/public/*": ["./public/*"],
      "@/content/*": ["./content/*"]
    }
  }
}
```

## File: tailwind.config.js
```js
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
}
```

## File: nuxt.config.ts
```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [
    '@/assets/css/github-markdown.css',
  ],
  runtimeConfig: {
    // The private keys which are only available within server-side
    email: process.env.AUTH_EMAIL,
    password: process.env.AUTH_PASSWORD,
    // Keys within public, will be also exposed to the client-side
    public: {
      apiUrl: process.env.API_URL,
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@pinia/nuxt'
  ],
  colorMode: {
    preference: 'dark'
  },
  content: {
    documentDriven: true,
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
    watch: false
  }
});


```

## File: tree.md
```md
- **pulse-api-docs/**
    - [app.vue](app.vue)
    - [package.json](package.json)
    - [tsconfig.json](tsconfig.json)
    - [tailwind.config.js](tailwind.config.js)
    - [nuxt.config.ts](nuxt.config.ts)
    - **public/**
        - [endpoints.json](public/endpoints.json)
    - **server/**
        - [tsconfig.json](server/tsconfig.json)
        - **api/**
            - [login.post.ts](server/api/login.post.ts)
    - **.git/**
        - **branches/**
        - **hooks/**
        - **info/**
        - **refs/**
            - **heads/**
            - **tags/**
        - **objects/**
            - **pack/**
            - **info/**
    - **content/**
        - [README.md](content/README.md)
        - **docs/**
            - [api.md](content/docs/api.md)
            - [apiEndpoints.md](content/docs/apiEndpoints.md)
            - [config.md](content/docs/config.md)
            - [dependencies.md](content/docs/dependencies.md)
            - [tests.md](content/docs/tests.md)
            - [usage.md](content/docs/usage.md)
            - **dev/**
                - [api_reference.md](content/docs/dev/api_reference.md)
                - [project.md](content/docs/dev/project.md)
                - [systemPrompt.md](content/docs/dev/systemPrompt.md)
                - [tasks.md](content/docs/dev/tasks.md)
    - **pages/**
        - [index.vue](pages/index.vue)
        - [login.vue](pages/login.vue)
        - [documentation.vue](pages/documentation.vue)
        - [test-endpoints.vue](pages/test-endpoints.vue)
    - **components/**
        - [EndpointList.vue](components/EndpointList.vue)
        - [DarkModeToggle.vue](components/DarkModeToggle.vue)
        - [TerminalEmulator.vue](components/TerminalEmulator.vue)
        - [LoadingOverlay.vue](components/LoadingOverlay.vue)
    - **assets/**
        - **css/**
        - **img/**
        - **data/**
            - [loaderItems.json](assets/data/loaderItems.json)
    - **stores/**
        - [loading.js](stores/loading.js)
    - **plugins/**
        - [fetchLoading.js](plugins/fetchLoading.js)
```

## File: public/endpoints.json
```json
{
    "endpoints": [
        {
            "id": "RegisterUser",
            "name": "Register User",
            "endpoint": "/api/auth/register",
            "method": "POST",
            "description": "Registers a new user.",
            "requestBody": [
                {
                    "name": "username",
                    "type": "string",
                    "required": true,
                    "description": "The username of the user.",
                    "default": "johndoe"
                },
                {
                    "name": "email",
                    "type": "string",
                    "required": true,
                    "description": "The email address of the user.",
                    "default": "johndoe@example.com"
                },
                {
                    "name": "password",
                    "type": "string",
                    "required": true,
                    "description": "The password for the user account.",
                    "default": "password123"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 201,
                    "body": {
                        "message": "User registered successfully",
                        "user_id": "<user_id>"
                    }
                },
                "error": {
                    "statusCode": 400,
                    "body": {
                        "error": "Missing required fields"
                    }
                }
            }
        },
        {
            "id": "LoginUser",
            "name": "Login User",
            "endpoint": "/api/auth/login",
            "method": "POST",
            "description": "Authenticates a user and generates a JWT token for authentication.",
            "requestBody": [
                {
                    "name": "email",
                    "type": "string",
                    "required": true,
                    "description": "The email address of the user.",
                    "default": "johndoe@example.com"
                },
                {
                    "name": "password",
                    "type": "string",
                    "required": true,
                    "description": "The password for the user account.",
                    "default": "password123"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "message": "Login successful",
                        "token": "<jwt_token>"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Invalid credentials"
                    }
                }
            }
        },
        {
            "name": "Get API Keys",
            "endpoint": "/api/auth/api-keys",
            "method": "GET",
            "description": "Retrieves the API keys for the authenticated user.",
            "headers": [
                {
                    "name": "Authorization",
                    "type": "string",
                    "required": true,
                    "description": "The JWT token obtained from the login endpoint, in the format 'Bearer <token>'.",
                    "default": "Bearer <token>"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "api_keys": [
                            {
                                "id": "<key_id>",
                                "key": "<api_key>",
                                "label": "<label>"
                            }
                        ]
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        },
        {
            "id": "CreateAPIKey",
            "name": "Create API Key",
            "endpoint": "/api/auth/api-keys",
            "method": "POST",
            "description": "Creates a new API key for the authenticated user.",
            "headers": [
                {
                    "name": "Authorization",
                    "type": "string",
                    "required": true,
                    "description": "The JWT token obtained from the login endpoint, in the format 'Bearer <token>'.",
                    "default": "Bearer <token>"
                }
            ],
            "requestBody": [
                {
                    "name": "label",
                    "type": "string",
                    "required": false,
                    "description": "A label for the API key.",
                    "default": "My API Key"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 201,
                    "body": {
                        "message": "API key created successfully",
                        "api_key": "<api_key>"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        },
        {
            "id": "RevokeAPIKey",
            "name": "Revoke API Key",
            "endpoint": "/api/auth/api-keys/<key_id>",
            "method": "DELETE",
            "description": "Revokes an API key for the authenticated user.",
            "headers": [
                {
                    "name": "Authorization",
                    "type": "string",
                    "required": true,
                    "description": "The JWT token obtained from the login endpoint, in the format 'Bearer <token>'.",
                    "default": "Bearer <token>"
                }
            ],
            "urlParameters": [
                {
                    "name": "key_id",
                    "type": "integer",
                    "required": true,
                    "description": "The ID of the API key to revoke.",
                    "default": 1
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "message": "API key revoked successfully"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        },
        {
            "id": "GetAllUsers",
            "name": "Get All Users",
            "endpoint": "/api/users",
            "method": "GET",
            "description": "Retrieves a list of all users.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": [
                        {
                            "id": "<user_id>",
                            "username": "<username>",
                            "email": "<email>"
                        }
                    ]
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        },
        {
            "id": "GetUserbyID",
            "name": "Get User by ID",
            "endpoint": "/api/users/<user_id>",
            "method": "GET",
            "description": "Retrieves a specific user by their ID.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "urlParameters": [
                {
                    "name": "user_id",
                    "type": "integer",
                    "required": true,
                    "description": "The ID of the user to retrieve.",
                    "default": 1
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "id": "<user_id>",
                        "username": "<username>",
                        "email": "<email>"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                },
                "notFound": {
                    "statusCode": 404,
                    "body": {
                        "error": "User not found"
                    }
                }
            }
        },
        {
            "id": "CreateUser",
            "name": "Create User",
            "endpoint": "/api/users",
            "method": "POST",
            "description": "Creates a new user.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "requestBody": [
                {
                    "name": "username",
                    "type": "string",
                    "required": true,
                    "description": "The username of the user.",
                    "default": "janedoe"
                },
                {
                    "name": "email",
                    "type": "string",
                    "required": true,
                    "description": "The email address of the user.",
                    "default": "janedoe@example.com"
                },
                {
                    "name": "password",
                    "type": "string",
                    "required": true,
                    "description": "The password for the user account.",
                    "default": "password456"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 201,
                    "body": {
                        "message": "User created successfully",
                        "user_id": "<user_id>"
                    }
                },
                "error": {
                    "statusCode": 400,
                    "body": {
                        "error": "Missing required fields"
                    }
                },
                "unauthorized": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        },
        {
            "id": "UpdateUser",
            "name": "Update User",
            "endpoint": "/api/users/<user_id>",
            "method": "PUT",
            "description": "Updates a user's information.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "urlParameters": [
                {
                    "name": "user_id",
                    "type": "integer",
                    "required": true,
                    "description": "The ID of the user to update.",
                    "default": 1
                }
            ],
            "requestBody": [
                {
                    "name": "username",
                    "type": "string",
                    "required": false,
                    "description": "The updated username of the user.",
                    "default": "janedoe_updated"
                },
                {
                    "name": "email",
                    "type": "string",
                    "required": false,
                    "description": "The updated email address of the user.",
                    "default": "janedoe_updated@example.com"
                },
                {
                    "name": "password",
                    "type": "string",
                    "required": false,
                    "description": "The updated password for the user account.",
                    "default": "newpassword789"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "message": "User updated successfully"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                },
                "notFound": {
                    "statusCode": 404,
                    "body": {
                        "error": "User not found"
                    }
                }
            }
        },
        {
            "id": "DeleteUser",
            "name": "Delete User",
            "endpoint": "/api/users/<user_id>",
            "method": "DELETE",
            "description": "Deletes a user.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "urlParameters": [
                {
                    "name": "user_id",
                    "type": "integer",
                    "required": true,
                    "description": "The ID of the user to delete.",
                    "default": 1
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "message": "User deleted successfully"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                },
                "notFound": {
                    "statusCode": 404,
                    "body": {
                        "error": "User not found"
                    }
                }
            }
        },
        {
            "id": "GetAllGroups",
            "name": "Get All Groups",
            "endpoint": "/api/groups",
            "method": "GET",
            "description": "Retrieves a list of all groups.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": [
                        {
                            "id": "<group_id>",
                            "name": "<group_name>"
                        }
                    ]
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        },
        {
            "id": "GetGroupByID",
            "name": "Get Group by ID",
            "endpoint": "/api/groups/<group_id>",
            "method": "GET",
            "description": "Retrieves a specific group by its ID.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "urlParameters": [
                {
                    "name": "group_id",
                    "type": "integer",
                    "required": true,
                    "description": "The ID of the group to retrieve.",
                    "default": 1
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "id": "<group_id>",
                        "name": "<group_name>"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                },
                "notFound": {
                    "statusCode": 404,
                    "body": {
                        "error": "Group not found"
                    }
                }
            }
        },
        {
            "id": "CreateGroup",
            "name": "Create Group",
            "endpoint": "/api/groups",
            "method": "POST",
            "description": "Creates a new group.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "requestBody": [
                {
                    "name": "name",
                    "type": "string",
                    "required": true,
                    "description": "The name of the group.",
                    "default": "New Group"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 201,
                    "body": {
                        "message": "Group created successfully",
                        "group_id": "<group_id>"
                    }
                },
                "error": {
                    "statusCode": 400,
                    "body": {
                        "error": "Missing required fields"
                    }
                },
                "unauthorized": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        },
        {
            "id": "UpdateGroup",
            "name": "Update Group",
            "endpoint": "/api/groups/<group_id>",
            "method": "PUT",
            "description": "Updates a group's information.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "urlParameters": [
                {
                    "name": "group_id",
                    "type": "integer",
                    "required": true,
                    "description": "The ID of the group to update.",
                    "default": 1
                }
            ],
            "requestBody": [
                {
                    "name": "name",
                    "type": "string",
                    "required": true,
                    "description": "The updated name of the group.",
                    "default": "Updated Group Name"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "message": "Group updated successfully"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                },
                "notFound": {
                    "statusCode": 404,
                    "body": {
                        "error": "Group not found"
                    }
                }
            }
        },
        {
            "id": "DeleteGroup",
            "name": "Delete Group",
            "endpoint": "/api/groups/<group_id>",
            "method": "DELETE",
            "description": "Deletes a group.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "urlParameters": [
                {
                    "name": "group_id",
                    "type": "integer",
                    "required": true,
                    "description": "The ID of the group to delete.",
                    "default": 1
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "message": "Group deleted successfully"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                },
                "notFound": {
                    "statusCode": 404,
                    "body": {
                        "error": "Group not found"
                    }
                }
            }
        },
        {
            "id": "SendNotification",
            "name": "Send Notification",
            "endpoint": "/api/notifications",
            "method": "POST",
            "description": "Sends a notification.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "requestBody": [
                {
                    "name": "user_id",
                    "type": "integer",
                    "required": false,
                    "description": "The ID of the user to send the notification to. Either 'user_id', 'group_id', or 'user_ids' must be provided.",
                    "default": 1
                },
                {
                    "name": "group_id",
                    "type": "integer",
                    "required": false,
                    "description": "The ID of the group to send the notification to. Either 'user_id', 'group_id', or 'user_ids' must be provided.",
                    "default": 1
                },
                {
                    "name": "user_ids",
                    "type": "array",
                    "required": false,
                    "description": "The IDs of the users to send the notification to. Either 'user_id', 'group_id', or 'user_ids' must be provided.",
                    "default": [
                        1,
                        2,
                        3
                    ]
                },
                {
                    "name": "title",
                    "type": "string",
                    "required": true,
                    "description": "The title of the notification.",
                    "default": "New Notification"
                },
                {
                    "name": "body",
                    "type": "string",
                    "required": true,
                    "description": "The body content of the notification.",
                    "default": "This is a new notification."
                },
                {
                    "name": "deep_link",
                    "type": "string",
                    "required": false,
                    "description": "The deep link to include in the notification.",
                    "default": "https://example.com/notification"
                },
                {
                    "name": "custom_data",
                    "type": "object",
                    "required": false,
                    "description": "Custom data to include in the notification.",
                    "default": {
                        "key1": "value1",
                        "key2": "value2"
                    }
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "message": "Notification sent successfully"
                    }
                },
                "error": {
                    "statusCode": 400,
                    "body": {
                        "error": "Missing required fields"
                    }
                },
                "unauthorized": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        },
        {
            "id": "GetAllNotifications",
            "name": "Get All Notifications",
            "endpoint": "/api/notifications",
            "method": "GET",
            "description": "Retrieves a list of all notifications.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": [
                        {
                            "id": "<notification_id>",
                            "title": "<title>",
                            "body": "<body>",
                            "sent_at": "<timestamp>"
                        }
                    ]
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        },
        {
            "id": "id",
            "name": "Get User Count",
            "endpoint": "/api/users/count",
            "method": "GET",
            "description": "Retrieves the total count of users.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "user_count": "<count>"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        },
        {
            "id": "GetGroupCount",
            "name": "Get Group Count",
            "endpoint": "/api/groups/count",
            "method": "GET",
            "description": "Retrieves the total count of groups.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "group_count": "<count>"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        },
        {
            "id": "GetApplicationCount",
            "name": "Get Application Count",
            "endpoint": "/api/applications/count",
            "method": "GET",
            "description": "Retrieves the total count of applications.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "application_count": "<count>"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        },
        {
            "id": "GetDeviceCount",
            "name": "Get Device Count",
            "endpoint": "/api/devices/count",
            "method": "GET",
            "description": "Retrieves the total count of devices.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "device_count": "<count>"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        },
        {
            "id": "GetNotificationCount",
            "name": "Get Notification Count",
            "endpoint": "/api/notifications/count",
            "method": "GET",
            "description": "Retrieves the total count of notifications.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "notification_count": "<count>"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        },
        {
            "id": "GetUserEngagementMetrics",
            "name": "Get User Engagement Metrics",
            "endpoint": "/api/users/<user_id>/engagement",
            "method": "GET",
            "description": "Retrieves engagement metrics for a specific user.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "urlParameters": [
                {
                    "name": "user_id",
                    "type": "integer",
                    "required": true,
                    "description": "The ID of the user to retrieve engagement metrics for.",
                    "default": 1
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "user_id": "<user_id>",
                        "notifications_received": "<notifications_received>",
                        "devices_registered": "<devices_registered>"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                },
                "notFound": {
                    "statusCode": 404,
                    "body": {
                        "error": "User not found"
                    }
                }
            }
        },
        {
            "id": "GetGroupEngagementMetrics",
            "name": "Get Group Engagement Metrics",
            "endpoint": "/api/groups/<group_id>/engagement",
            "method": "GET",
            "description": "Retrieves engagement metrics for a specific group.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "urlParameters": [
                {
                    "name": "group_id",
                    "type": "integer",
                    "required": true,
                    "description": "The ID of the group to retrieve engagement metrics for.",
                    "default": 1
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "group_id": "<group_id>",
                        "notifications_sent": "<notifications_sent>",
                        "user_count": "<user_count>"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                },
                "notFound": {
                    "statusCode": 404,
                    "body": {
                        "error": "Group not found"
                    }
                }
            }
        },
        {
            "id": "GetApplicationEngagementMetrics",
            "name": "Get Application Engagement Metrics",
            "endpoint": "/api/applications/<application_id>/engagement",
            "method": "GET",
            "description": "Retrieves engagement metrics for a specific application.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "urlParameters": [
                {
                    "name": "application_id",
                    "type": "integer",
                    "required": true,
                    "description": "The ID of the application to retrieve engagement metrics for.",
                    "default": 1
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "application_id": "<application_id>",
                        "notifications_sent": "<notifications_sent>",
                        "user_count": "<user_count>"
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                },
                "notFound": {
                    "statusCode": 404,
                    "body": {
                        "error": "Application not found"
                    }
                }
            }
        },
        {
            "id": "GetNotificationHistory",
            "name": "Get Notification History",
            "endpoint": "/api/notifications/history",
            "method": "GET",
            "description": "Retrieves the notification history.",
            "headers": [
                {
                    "name": "X-API-Key",
                    "type": "string",
                    "required": true,
                    "description": "The API key for authentication.",
                    "default": "<api_key>"
                }
            ],
            "queryParameters": [
                {
                    "name": "limit",
                    "type": "integer",
                    "required": false,
                    "description": "The maximum number of notifications to retrieve.",
                    "default": 100
                }
            ],
            "response": {
                "success": {
                    "statusCode": 200,
                    "body": {
                        "notification_history": [
                            {
                                "id": "<notification_id>",
                                "user_id": "<user_id>",
                                "group_id": "<group_id>",
                                "application_id": "<application_id>",
                                "title": "<title>",
                                "body": "<body>",
                                "timestamp": "<timestamp>"
                            }
                        ]
                    }
                },
                "error": {
                    "statusCode": 401,
                    "body": {
                        "error": "Unauthorized"
                    }
                }
            }
        }
    ]
}
```

## File: server/tsconfig.json
```json
{
  "extends": "../.nuxt/tsconfig.server.json"
}

```

## File: server/api/login.post.ts
```ts
import { sendError } from 'h3';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);


  const authEmail = useRuntimeConfig().email;
  const authPassword = useRuntimeConfig().password;

  // Validate credentials (this example uses hard-coded values, replace with your env variables)
  const isValid = email === authEmail && password === authPassword

  if (isValid) {
    const token = generateSessionToken();
    return {
      token,
      message: 'Login successful',
    };
  } else {
    // Invalid credentials
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    }));
  }
});

function generateSessionToken() {
  // Generate a random session token
  // You can use a library like 'jsonwebtoken' for more secure token generation
  return Math.random().toString(36).substring(7);
}
```

## File: pages/index.vue
```vue
<!-- pages/index.vue -->
<template>
    <div class="prose dark:prose-invert">
        <ContentRendererMarkdown :value="doc" />
    </div>
</template>

<script setup>
const { data: doc } = await useAsyncData('index', () => queryContent('/').findOne());
</script>
```

## File: pages/login.vue
```vue
<template>
  <div class="flex justify-center items-center h-screen bg-opacity-90">
    <div class="w-full max-w-md">

      <form class="bg-white bg-opacity-70 shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="login">
        <div class="flex justify-center mb-8">
          <img src="~/assets/img/logo.png" alt="Logo" style="height:200px">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="email" placeholder="Email" required>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="Password" required>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-indigo-950 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

async function login() {
  const response = await $fetch('/api/login', {
    method: 'POST',
    body: {
      email: email.value,
      password: password.value,
    },
  });

  if (response.token) {
    // Authentication successful
    // Create session token and store it
    localStorage.setItem('sessionToken', response.token);

    // Redirect to the desired page
    router.push('/');
  } else {
    // Authentication failed
    alert('Invalid email or password');
  }
}
</script>
```

## File: pages/documentation.vue
```vue
<template>
    <div class="prose dark:prose-invert">
        <ContentDoc path="/README" />
    </div>
</template>
```

## File: pages/test-endpoints.vue
```vue
<!-- pages/test-endpoints.vue -->
<template>
    <div>
        <h1 class="text-4xl font-bold mb-8">API Endpoints</h1>
        <EndpointList />
    </div>
</template>

<script setup>
import EndpointList from '~/components/EndpointList.vue';
</script>
```

## File: pages/[...slug].vue
```vue
<template>
    <div class="prose dark:prose-invert">
      <ContentDoc />
    </div>
  </template>
```

## File: components/EndpointList.vue
```vue
<!-- components/EndpointList.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div v-for="endpoint in endpoints" :key="endpoint.name" class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">{{ endpoint.name }}</h2>
      <p class="text-gray-600 dark:text-gray-400">{{ endpoint.description }}</p>
      <button @click="openModal(endpoint)" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Try It Out
      </button>
    </div>
  </div>

  <div v-if="selectedEndpoint" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-full md:w-1/2 lg:w-1/3 relative">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{{ selectedEndpoint.name }}</h2>
      <form @submit.prevent="makeRequest">
        <div v-for="param in selectedEndpoint.requestBody" :key="param.name" class="mb-4">
          <label :for="param.name" class="block mb-1 text-gray-700 dark:text-gray-400">{{ param.name }}</label>
          <input
            :id="param.name"
            v-model="requestData[param.name]"
            :type="param.type"
            :placeholder="param.default"
            class="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">{{ param.description }}</p>
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
        <button
          @click="closeModal"
          class="ml-4 px-4 py-2 bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-400 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </form>
      <div v-if="response || error" class="mt-8">
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {{ error ? 'Error' : 'Response' }}
        </h3>
        <pre class="bg-gray-100 dark:bg-gray-700 p-4 rounded text-gray-900 dark:text-white max-h-300 overflow-auto">
          {{ error || JSON.stringify(response, null, 2) }}
        </pre>
      </div>
      <div v-if="previousResponse" class="mt-8">
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Previous Response</h3>
        <pre class="bg-gray-100 dark:bg-gray-700 p-4 rounded text-gray-900 dark:text-white max-h-300 overflow-auto">
          {{ JSON.stringify(previousResponse, null, 2) }}
        </pre>
      </div>
    </div>
  </div>

  <LoadingOverlay :loading="loading" :progress="progress" :loading-text="loadingText" />
</template>

<script setup>
import { ref } from 'vue';
import LoadingOverlay from '~/components/LoadingOverlay.vue';

const loading = ref(false);
const progress = ref(0);
const loadingText = ref('');
const apiUrl = useRuntimeConfig().public.apiUrl;

const endpoints = ref([]);
const selectedEndpoint = ref(null);
const requestData = ref({});
const response = ref(null);
const error = ref(null);
const previousResponse = ref(null);

async function fetchEndpoints() {
  loading.value = true;
  loadingText.value = 'Fetching endpoints...';

  try {
    const response = await fetch('/endpoints.json');
    const data = await response.json();
    endpoints.value = data.endpoints;
  } catch (error) {
    console.error('Failed to fetch endpoints:', error);
  } finally {
    loading.value = false;
  }
}

function openModal(endpoint) {
  selectedEndpoint.value = endpoint;

  // Retrieve saved form input values from local storage
  const savedInputs = localStorage.getItem(`endpoint-${endpoint.id}`);
  if (savedInputs) {
    requestData.value = JSON.parse(savedInputs);
  } else {
    requestData.value = {};
  }

  // Retrieve previous API response from local storage
  const savedResponse = localStorage.getItem(`endpoint-${endpoint.id}-response`);
  if (savedResponse) {
    previousResponse.value = JSON.parse(savedResponse);
  } else {
    previousResponse.value = null;
  }
}

function closeModal() {
  selectedEndpoint.value = null;
  response.value = null;
  error.value = null;
}

async function makeRequest() {
  const endpoint = selectedEndpoint.value;

  try {
    const { data } = await $fetch(endpoint.endpoint, {
      method: 'POST',
      body: requestData.value,
      baseURL: apiUrl,
    });
    response.value = data;
    error.value = null;

    // Save form input values to local storage
    localStorage.setItem(`endpoint-${endpoint.id}`, JSON.stringify(requestData.value));

    // Save API response to local storage
    localStorage.setItem(`endpoint-${endpoint.id}-response`, JSON.stringify(data));
  } catch (err) {
    error.value = err.data || 'An error occurred';
    response.value = null;
  }
}

fetchEndpoints();
</script>

<style scoped>
.max-h-300 {
  max-height: 300px;
}
</style>
```

## File: components/DarkModeToggle.vue
```vue
<template>
    <button @click="toggleColorMode" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      {{ $colorMode.value === 'dark' ? 'Light Mode' : 'Dark Mode' }}
    </button>
  </template>
  
  <script setup>
  const colorMode = useColorMode();
  
  function toggleColorMode() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  }
  </script>
```

## File: components/TerminalEmulator.vue
```vue
<template>
  <div ref="terminal" class="terminal"></div>
</template>

<script setup>
import { Terminal } from 'xterm';
import { onMounted, ref } from 'vue';
import { exec } from 'shelljs';

const terminal = ref(null);

onMounted(() => {
  const term = new Terminal();
  term.open(terminal.value);
  term.write('Terminal Emulator\r\n');
  
  term.onData(data => {
    const command = data.trim();
    const output = exec(command, { silent: true }).stdout;
    term.write(`\r\n${output}\r\n`);
    term.write('$ ');
  });
  
  term.write('$ ');
});
</script>

<style scoped>
.terminal {
  height: 300px;
}
</style>
```

## File: components/LoadingOverlay.vue
```vue
<!-- components/LoadingOverlay.vue -->
<template>
  <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="text-center p-5 bg-white rounded-lg shadow">
      <p class="mb-2">{{ currentOperationName || 'Loading...' }}</p>
      <progress class="progress w-56" :value="progress" max="100"></progress>
      <p class="text-sm mt-2">Please wait, loading {{ progress.toFixed(0) }}%</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useLoadingStore } from '~/stores/loading';

const loadingStore = useLoadingStore();

// Computed properties to reflect the current loading state
const isLoading = computed(() => loadingStore.isLoading);
const currentOperationName = computed(() => loadingStore.currentOperationName);
const progress = computed(() => loadingStore.progress);
</script>
```

## File: assets/data/loaderItems.json
```json
[
    { "item": "Images" },
    { "item": "CSS files" },
    { "item": "JavaScript files" },
    { "item": "Font files" },
    { "item": "HTML templates" },
    { "item": "JSON data" },
    { "item": "SVG icons" },
    { "item": "External libraries" },
    { "item": "API responses" },
    { "item": "Analytics scripts" },
    { "item": "Custom fonts" },
    { "item": "Static files" },
    { "item": "Authentication tokens" },
    { "item": "Video files" },
    { "item": "Audio files" },
    { "item": "Configurations" },
    { "item": "Localization files" },
    { "item": "User settings" },
    { "item": "Cache data" },
    { "item": "Dynamic content" }
  ]
```

## File: stores/loading.js
```js
// stores/loading.js
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loadingCount: 0,
    currentOperationName: '',
    totalFiles: 0,
    loadedFiles: 0,
  }),
  getters: {
    isLoading: (state) => state.loadingCount > 0,
    progress: (state) => (state.totalFiles > 0 ? (state.loadedFiles / state.totalFiles) * 100 : 0),
  },
  actions: {
    startLoading(operationName, totalFiles) {
      this.loadingCount++;
      this.currentOperationName = operationName;
      this.totalFiles = totalFiles;
      this.loadedFiles = 0;
    },
    updateProgress(loadedFiles) {
      this.loadedFiles = loadedFiles;
    },
    stopLoading() {
      if (this.loadingCount > 0) {
        this.loadingCount--;
      }
      if (this.loadingCount === 0) {
        this.currentOperationName = '';
        this.totalFiles = 0;
        this.loadedFiles = 0;
      }
    },
  },
});
```

## File: plugins/fetchLoading.js
```js
// plugins/fetchLoading.js
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:created', () => {
      const loadingStore = useLoadingStore();
  
      nuxtApp.hook('useFetch:before', (request) => {
        loadingStore.startLoading(request.url, 1);
      });
  
      nuxtApp.hook('useFetch:finish', () => {
        loadingStore.stopLoading();
      });
  
      nuxtApp.hook('useFetch:error', () => {
        loadingStore.stopLoading();
      });
    });
  });
```



<p id="hidden_comment">
    This is a hidden comment. It explains that the following style tag is meant to 
    style HTML content if this Markdown is converted to HTML. This comment should 
    not be visible in most Markdown renderers.
</p>
<style>
    #hidden_comment {
        display: none;
    }
    table {
        width: 100%;
    }
    table tr:first-child {
        font-weight: bold;
    }
    table tr:last-child {
        font-style: italic;
    }
</style>

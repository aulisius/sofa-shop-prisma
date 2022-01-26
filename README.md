## Sofa Shop

This project was created as part of a webinar conducted with GUVI on the topic, "How to build an eCommerce Store with React + Node"

## Setup Instructions

## Prerequisites

* Latest version of MySQL database (this can be running on your local)
* Stripe Test Account (this is needed to perform payments)
* node.js >= v14 (We use ESM for the API server)

### Dependency Installation

```
npm install
```

### DB Setup

You can use Prisma to setup and manage your DB for you

Before starting, copy the `.env.template` into `.env.local` and add your `DATABASE_URL` which points to your MySQL database.

To setup the tables on your DB,

```sh
npx prisma db push
```

To view the data in the DB,

```sh
npx prisma studio
```

### API

You can start the API server with the following command

```
npm run dev:api
```

This starts it in a nodemon process which will auto reload your code.

Your server will be running at http://localhost:8000

### UI

You can start the UI with the following command

```
npm run dev:ui
```

Your UI will be running at http://localhost:3000




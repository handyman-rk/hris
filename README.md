This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
Install dependencies:
```bash
npm install --legacy-peer-deps
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Structure
```
├── app
│   ├── api
│   │   └── graphql       GraphQL API endpoint
│   ├── (apollo)          Apollo GraphQL Sandbox
│   ├── (dash)            Dashboard
│   │   └── birthdays     Birthdays page
│   │   └── leaves        Leaes page
├── components  Customized components
│── lib          Utility functions
```

## GraphQL Sandbox
Open [http:localhost:3000/sandbox](http:localhost:3000/sandbox) to use the Apollo GraphQL Sandbox.


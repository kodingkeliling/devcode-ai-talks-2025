# Database Plan - Kenangan Devcode AI Talk 2025

## Overview
This document outlines the database strategy for the "Kenangan Devcode AI Talk 2025" digital scrapbook application. We will use **Supabase** as the primary PostgreSQL database provider and **Prisma (v6.x)** as the ORM to manage migrations and data access.

## Connection Configuration
Based on the provided credentials, the following environment variables will be used in the `.env` file:

```env
DATABASE_URL="postgresql://postgres.fhtwgycoqtggysgznlua:v7tXdd0oa4KQ9rUO@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.fhtwgycoqtggysgznlua:v7tXdd0oa4KQ9rUO@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
```

The `DATABASE_URL` uses the **Transaction Pooler (port 6543)** with PgBouncer, which is ideal for serverless environments (Next.js). The `DIRECT_URL` connects directly to the database (port 5432) and should be used specifically for Prisma migrations.

## Prisma Schema
We will define a single table named `Memory` to store the scrapbook entries.

### Schema Definition (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model Memory {
  id           String   @id @default(cuid())
  userName     String   // The name of the person who uploaded
  caption      String?  @db.Text
  imageUrl     String   // The Google Drive view URL
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## Migration Steps (Prisma 6.x)
To set up the database, the following steps will be taken:

1. **Initialize Prisma**: Run `npx prisma init`.
2. **Configure Schema**: Update `prisma/schema.prisma` with the definition above.
3. **Run Migration**: Execute the migration to create the table in Supabase.
   ```bash
   npx prisma migrate dev --name init_memory_table
   ```
4. **Generate Client**:
   ```bash
   npx prisma generate
   ```

## Next Steps
Once the database is ready, we will proceed with the Google Drive OAuth integration to handle the file uploads before saving the metadata to the `Memory` table.

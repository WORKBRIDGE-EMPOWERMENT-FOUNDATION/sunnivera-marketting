import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 160 }).notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull().default(''),
  featuredImage: text('featured_image').notNull().default(''),
  body: text('body').notNull().default(''), // Markdown
  tags: text('tags').notNull().default(''), // comma separated
  status: varchar('status', { length: 12 }).notNull().default('draft'), // draft | published
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const contactInquiries = pgTable('contact_inquiries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  company: varchar('company', { length: 160 }).notNull().default(''),
  email: varchar('email', { length: 200 }).notNull(),
  service: varchar('service', { length: 60 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}).enableRLS()

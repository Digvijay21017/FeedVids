import { boolean, pgTable, serial, varchar, json } from "drizzle-orm/pg-core";

export const User = pgTable('users', {
    id : serial('id').primaryKey(),
    name : varchar('name').notNull(),
    email : varchar('email').notNull(),
    imageUrl : varchar('imageUrl'),
    subscription : boolean('subsription').default(false)
}) 

export const VideoData = pgTable('videoData', {
    id: serial('id').primaryKey(),
    script: json('script').notNull(),
    audioFileUrl: varchar('audioFileUrl').notNull(),
    captions: json('captions').notNull(),
    imageList: json('imageList').notNull(),
    createdBy: varchar('createdBy').notNull(),
})
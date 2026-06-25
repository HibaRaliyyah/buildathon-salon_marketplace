"use server";

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "../lib/mongodb";
import { ObjectId } from "mongodb";

interface ContactDoc {
  _id?: ObjectId;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export const submitContact = createServerFn({ method: "POST" })
  .validator(ContactSchema)
  .handler(async ({ data }) => {
    const db = await getDb();
    const contacts = db.collection<ContactDoc>("contacts");

    await contacts.insertOne({
      name: data.name,
      email: data.email,
      message: data.message,
      createdAt: new Date(),
    });

    return { success: true };
  });

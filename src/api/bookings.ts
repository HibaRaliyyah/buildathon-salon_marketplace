"use server";

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "../lib/mongodb";
import { ObjectId } from "mongodb";

interface BookingDoc {
  _id?: ObjectId;
  userId: string;
  salonName: string;
  service: string;
  date: string;
  time: string;
  status: string;
  createdAt: Date;
}

const CreateBookingSchema = z.object({
  userId: z.string(),
  salonName: z.string(),
  service: z.string(),
  date: z.string(),
  time: z.string(),
});

export const createBooking = createServerFn({ method: "POST" })
  .validator(CreateBookingSchema)
  .handler(async ({ data }) => {
    const db = await getDb();
    const bookings = db.collection<BookingDoc>("bookings");

    const result = await bookings.insertOne({
      userId: data.userId,
      salonName: data.salonName,
      service: data.service,
      date: data.date,
      time: data.time,
      status: "confirmed",
      createdAt: new Date(),
    });

    return { id: result.insertedId.toString(), ...data, status: "confirmed" };
  });

const GetBookingsSchema = z.object({ userId: z.string() });

export const getUserBookings = createServerFn({ method: "POST" })
  .validator(GetBookingsSchema)
  .handler(async ({ data }) => {
    const db = await getDb();
    const bookings = db.collection<BookingDoc>("bookings");

    const results = await bookings
      .find({ userId: data.userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    return results.map((b) => ({
      id: b._id!.toString(),
      userId: b.userId,
      salonName: b.salonName,
      service: b.service,
      date: b.date,
      time: b.time,
      status: b.status,
    }));
  });

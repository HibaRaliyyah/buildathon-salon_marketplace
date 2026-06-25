"use server";

import { createServerFn } from "@tanstack/react-start";
import { getDb } from "../lib/mongodb";
import { ObjectId } from "mongodb";

interface SalonDoc {
  _id?: ObjectId;
  name: string;
  area: string;
  distance: string;
  rating: number;
  match: number;
  price: string;
  open: boolean;
  tag: string;
  description: string;
  createdAt: Date;
}

const SALON_SEED: Omit<SalonDoc, "_id" | "createdAt">[] = [
  { name: "Atelier Rose", area: "Indiranagar", distance: "1.2 km", rating: 4.9, match: 98, price: "₹₹₹", open: true, tag: "Hair · Skin", description: "Award-winning hair & skin atelier specializing in editorial cuts, balayage, and Korean glass-skin facials." },
  { name: "Maison Bridal", area: "Malleshwaram", distance: "3.1 km", rating: 4.9, match: 96, price: "₹₹₹₹", open: true, tag: "Bridal", description: "Bengaluru's premier bridal studio. Royal bridal glow packages, airbrush makeup and mehendi." },
  { name: "Luna Artistry", area: "Koramangala", distance: "2.4 km", rating: 4.8, match: 95, price: "₹₹", open: true, tag: "K-Beauty", description: "Korean beauty specialists. Glass hair, glass skin, GRWM packages and trending K-beauty looks." },
  { name: "Velvet & Co.", area: "Whitefield", distance: "5.1 km", rating: 4.7, match: 89, price: "₹₹₹₹", open: false, tag: "Spa", description: "Luxury spa and wellness centre with Ayurvedic treatments, deep tissue massage and facials." },
  { name: "The Old Soul", area: "HSR Layout", distance: "4.0 km", rating: 4.6, match: 91, price: "₹₹", open: true, tag: "Men's", description: "Classic barbershop meets modern grooming. Fades, beard sculpts and hot towel shaves." },
  { name: "Gloss Studio", area: "Jayanagar", distance: "2.9 km", rating: 4.8, match: 93, price: "₹₹", open: true, tag: "Nails", description: "Nail art specialists. Gel manicures, nail extensions, nail art and pedicures." },
];

async function seedSalons() {
  const db = await getDb();
  const salons = db.collection<SalonDoc>("salons");
  const count = await salons.countDocuments();
  if (count === 0) {
    await salons.insertMany(SALON_SEED.map((s) => ({ ...s, createdAt: new Date() })));
  }
}

export const getSalons = createServerFn({ method: "GET" }).handler(async () => {
  await seedSalons();
  const db = await getDb();
  const salons = db.collection<SalonDoc>("salons");
  const results = await salons.find({}).toArray();
  return results.map((s) => ({
    id: s._id!.toString(),
    name: s.name,
    area: s.area,
    distance: s.distance,
    rating: s.rating,
    match: s.match,
    price: s.price,
    open: s.open,
    tag: s.tag,
    description: s.description,
  }));
});

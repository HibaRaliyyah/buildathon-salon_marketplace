"use server";

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "../lib/mongodb";
import { hashPassword, verifyPassword, signJWT } from "../lib/auth-helpers";
import { ObjectId } from "mongodb";

interface UserDoc {
  _id?: ObjectId;
  username: string;
  fullName: string;
  phone: string;
  passwordHash: string;
  beautyProfile: {
    skinTone: string;
    hairType: string;
    faceShape: string;
    preferredServices: string[];
    locality: string;
    budget: string;
  };
  rewardPoints: number;
  createdAt: Date;
}

const RegisterSchema = z.object({
  username: z.string().min(3).max(30),
  fullName: z.string().min(2),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z.string().min(6),
});

const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const registerUser = createServerFn({ method: "POST" })
  .validator(RegisterSchema)
  .handler(async ({ data }) => {
    const db = await getDb();
    const users = db.collection<UserDoc>("users");

    const existing = await users.findOne({ username: data.username.toLowerCase() });
    if (existing) {
      throw new Error("Username already taken. Please choose another.");
    }

    const passwordHash = await hashPassword(data.password);
    const now = new Date();

    const result = await users.insertOne({
      username: data.username.toLowerCase(),
      fullName: data.fullName,
      phone: data.phone,
      passwordHash,
      beautyProfile: {
        skinTone: "",
        hairType: "",
        faceShape: "",
        preferredServices: [],
        locality: "",
        budget: "",
      },
      rewardPoints: 100,
      createdAt: now,
    });

    const userId = result.insertedId.toString();
    const token = signJWT({ userId, username: data.username.toLowerCase() });

    return {
      token,
      user: {
        id: userId,
        username: data.username.toLowerCase(),
        fullName: data.fullName,
        rewardPoints: 100,
      },
    };
  });

export const loginUser = createServerFn({ method: "POST" })
  .validator(LoginSchema)
  .handler(async ({ data }) => {
    const db = await getDb();
    const users = db.collection<UserDoc>("users");

    const user = await users.findOne({ username: data.username.toLowerCase() });
    if (!user) {
      throw new Error("Invalid username or password.");
    }

    const valid = await verifyPassword(data.password, user.passwordHash);
    if (!valid) {
      throw new Error("Invalid username or password.");
    }

    const userId = user._id!.toString();
    const token = signJWT({ userId, username: user.username });

    return {
      token,
      user: {
        id: userId,
        username: user.username,
        fullName: user.fullName,
        rewardPoints: user.rewardPoints ?? 0,
      },
    };
  });

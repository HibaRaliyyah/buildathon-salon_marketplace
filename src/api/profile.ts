"use server";

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "../lib/mongodb";
import { ObjectId } from "mongodb";

interface BeautyProfile {
  skinTone: string;
  hairType: string;
  faceShape: string;
  preferredServices: string[];
  locality: string;
  budget: string;
}

interface UserDoc {
  _id?: ObjectId;
  username: string;
  fullName: string;
  phone: string;
  beautyProfile: BeautyProfile;
  rewardPoints: number;
}

const BeautyProfileSchema = z.object({
  userId: z.string(),
  skinTone: z.string().default(""),
  hairType: z.string().default(""),
  faceShape: z.string().default(""),
  preferredServices: z.array(z.string()).default([]),
  locality: z.string().default(""),
  budget: z.string().default(""),
});

export const saveBeautyProfile = createServerFn({ method: "POST" })
  .validator(BeautyProfileSchema)
  .handler(async ({ data }) => {
    const db = await getDb();
    const users = db.collection<UserDoc>("users");

    const { userId, ...profile } = data;

    await users.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          beautyProfile: {
            skinTone: profile.skinTone,
            hairType: profile.hairType,
            faceShape: profile.faceShape,
            preferredServices: profile.preferredServices,
            locality: profile.locality,
            budget: profile.budget,
          },
        },
      },
    );

    return { success: true };
  });

const GetProfileSchema = z.object({ userId: z.string() });

export const getProfile = createServerFn({ method: "POST" })
  .validator(GetProfileSchema)
  .handler(async ({ data }) => {
    const db = await getDb();
    const users = db.collection<UserDoc>("users");

    const user = await users.findOne({ _id: new ObjectId(data.userId) });
    if (!user) throw new Error("User not found");

    return {
      id: user._id!.toString(),
      username: user.username,
      fullName: user.fullName,
      phone: user.phone,
      beautyProfile: user.beautyProfile,
      rewardPoints: user.rewardPoints ?? 0,
    };
  });

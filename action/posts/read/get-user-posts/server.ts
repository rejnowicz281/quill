"use server";

import getUserPosts from ".";

export default async (userId: string) => getUserPosts(userId);

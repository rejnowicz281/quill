"use server";

import getMinimalPost from ".";

export default async (postId: string) => getMinimalPost(postId);

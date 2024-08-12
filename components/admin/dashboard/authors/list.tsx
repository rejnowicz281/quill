"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BasicUser } from "@/lib/types/user";
import Image from "next/image";
import Link from "next/link";
import RevokeAuthor from "./revoke";

export default function AuthorsList({ authors }: { authors: BasicUser[] }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-xl">Authors</h2>
                <p className="text-gray-500 dark:text-gray-400">
                    {authors.length > 0
                        ? "Authors are users who can create and manage their own posts."
                        : "No authors to display."}
                </p>
            </div>
            {authors.map((author) => (
                <Card key={author.id}>
                    <CardHeader>
                        <CardTitle>
                            <Link className="flex gap-2 items-center hover:underline" href={`/chats/${author.id}`}>
                                <Image
                                    width={32}
                                    height={32}
                                    className="rounded-[50%]"
                                    src={author.avatar_url}
                                    alt={author.id}
                                />
                                {author.name}
                            </Link>
                        </CardTitle>
                        <CardDescription>{author.email}</CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-between">
                        <RevokeAuthor author={author} />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

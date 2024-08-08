"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BasicUser } from "@/lib/types/user";
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
                            <Link href={`/chats/${author.id}`} className="hover:underline">
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

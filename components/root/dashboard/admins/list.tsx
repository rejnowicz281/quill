"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BasicUser } from "@/lib/types/user";
import Link from "next/link";
import RevokeAdmin from "./revoke";

export default function AdminsList({ admins }: { admins: BasicUser[] }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-xl">Admins</h2>
                <p className="text-gray-500 dark:text-gray-400">
                    {admins.length > 0 ? "Here you can see all of the admins of the blog." : "No admins to display."}
                </p>
            </div>
            {admins.map((admin) => (
                <Card key={admin.id}>
                    <CardHeader>
                        <CardTitle>
                            <Link href={`/chats/${admin.id}`} className="hover:underline">
                                {admin.name}
                            </Link>
                        </CardTitle>
                        <CardDescription>{admin.email}</CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-between">
                        <RevokeAdmin admin={admin} />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

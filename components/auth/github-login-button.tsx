import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export default function GithubLoginButton() {
    return (
        <form
            action={async () => {
                "use server";

                const clientID = process.env.GITHUB_CLIENT_ID;
                const redirectURI = process.env.GITHUB_REDIRECT_URI;

                redirect(
                    `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=user:email`
                );
            }}
        >
            <Button variant="secondary">Login with GitHub</Button>
        </form>
    );
}

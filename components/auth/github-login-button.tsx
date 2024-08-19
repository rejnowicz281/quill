import { redirect } from "next/navigation";

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
            <button>Login with GitHub</button>
        </form>
    );
}

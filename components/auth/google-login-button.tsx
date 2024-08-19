import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export default function GoogleLoginButton() {
    return (
        <form
            action={async () => {
                "use server";

                const clientID = process.env.GOOGLE_CLIENT_ID;
                const redirectURI = process.env.GOOGLE_REDIRECT_URI;
                const scope =
                    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
                const accessType = "offline";
                const responseType = "code";

                redirect(
                    `https://accounts.google.com/o/oauth2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}&access_type=${accessType}`
                );
            }}
        >
            <Button>Login with Google</Button>
        </form>
    );
}

import githubAuth from "@/action/auth/modify/oauth/github";
import AuthCallback from "@/components/auth/callback";

export default function GithubCallbackPage() {
    return <AuthCallback action={githubAuth} />;
}

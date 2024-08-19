import googleAuth from "@/action/auth/modify/oauth/google";
import AuthCallback from "@/components/auth/callback";

export default function GoogleCallbackPage() {
    return <AuthCallback action={googleAuth} />;
}

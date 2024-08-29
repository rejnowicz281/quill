import { googleRedirect } from "@/action/auth/modify/oauth/google";
import SubmitButton from "@/components/general/submit-button";
import GoogleSvg from "@/components/icons/google-svg";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function GoogleLoginButton() {
    return (
        <form className="flex flex-col" action={googleRedirect}>
            <Button
                asChild
                className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-white font-semibold flex flex-row items-center gap-1"
            >
                <SubmitButton
                    content={
                        <>
                            <div className="bg-white rounded-full">
                                <GoogleSvg />
                            </div>
                            Google
                        </>
                    }
                    loading={
                        <>
                            <LoaderCircle className="animate-spin" size={20} />
                            Google
                        </>
                    }
                />
            </Button>
        </form>
    );
}

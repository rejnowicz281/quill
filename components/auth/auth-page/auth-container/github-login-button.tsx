import { githubRedirect } from "@/action/auth/modify/oauth/github";
import SubmitButton from "@/components/general/submit-button";
import GithubSvg from "@/components/icons/github-svg";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function GithubLoginButton() {
    return (
        <form className="flex flex-col" action={githubRedirect}>
            <Button
                asChild
                className="dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:border dark:border-neutral-700 flex flex-row font-semibold items-center gap-1"
            >
                <SubmitButton
                    content={
                        <>
                            <GithubSvg />
                            Github
                        </>
                    }
                    loading={
                        <>
                            <LoaderCircle className="animate-spin" size={20} />
                            Github
                        </>
                    }
                />
            </Button>
        </form>
    );
}

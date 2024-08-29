import demoLogin from "@/action/auth/modify/demo-login";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { FastForward, LoaderCircle } from "lucide-react";

export default function DemoLoginButton() {
    return (
        <form className="flex flex-col" action={demoLogin}>
            <Button asChild className="border border-neutral-300 flex flex-row items-center gap-1">
                <SubmitButton
                    content={
                        <>
                            <FastForward size={20} />
                            Demo Login
                        </>
                    }
                    loading={
                        <>
                            <LoaderCircle className="animate-spin" size={20} />
                            Demo Login
                        </>
                    }
                />
            </Button>
        </form>
    );
}

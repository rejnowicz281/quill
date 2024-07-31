import logout from "@/action/auth/modify/logout";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";

const Home = () => (
    <div className="flex items-center flex-col flex-1 gap-6 justify-center">
        <h1 className="text-9xl font-semibold tracking-wide">quill</h1>
        <form action={logout}>
            <Button asChild>
                <SubmitButton content="Logout" />
            </Button>
        </form>
    </div>
);

export default Home;

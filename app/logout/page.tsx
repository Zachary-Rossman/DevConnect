import { cookies } from "next/headers";
import LogoutConfirmation from "@/components/auth/LogoutConfirmation";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function LogoutPage() {
    // Check Authentication
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // Redirect Unauthenticated Users
    if (!token || !verifyToken(token)) {
        redirect("/login");
    }

    return <LogoutConfirmation />;
}
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
async function AuthCheck({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/auth/signin");
  }
  return <>{children}</>;
}

export default AuthCheck;

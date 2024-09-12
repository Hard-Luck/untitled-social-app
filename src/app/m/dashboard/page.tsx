import { log } from "console";
import {
  SocialDashboard,
  SocialDashboardProps,
} from "~/components/social-dashboard";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }
  const userId = session.user.id;

  const socialLinks = await api.socialLinks.getById({ userId });
  log(socialLinks);

  return (
    <SocialDashboard
      urls={socialLinks.reduce(
        (acc, link) => {
          acc[
            link.platform.toLowerCase() as keyof SocialDashboardProps["urls"]
          ] = link.url;
          return acc;
        },
        {} as SocialDashboardProps["urls"],
      )}
    />
  );
}
export default DashboardPage;

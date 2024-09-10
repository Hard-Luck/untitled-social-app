import {
  SocialDashboard,
  SocialDashboardProps,
} from "~/components/social-dashboard";
import validLinks from "~/config/valid-links";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }
  const userId = session.user.id;

  const socialLinks = await api.socialLinks.getById({ userId });
  const validSocialLinks = socialLinks.filter((link) =>
    validLinks.includes(link.platform),
  );

  return (
    <SocialDashboard
      urls={validSocialLinks.reduce(
        (acc, link) => {
          acc[link.platform as keyof SocialDashboardProps["urls"]] = link.url;
          return acc;
        },
        {} as SocialDashboardProps["urls"],
      )}
    />
  );
}
export default DashboardPage;

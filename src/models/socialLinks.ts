import { db } from "~/server/db";

async function userHasPlatformLink(userId: string, platform: string) {
  const check = await db.socialLinks.findFirst({
    where: {
      userId,
      platform,
    },
  });
  return !!check;
}
export async function updateSocialLink({
  userId,
  platform,
  url,
}: {
  userId: string;
  platform: string;
  url: string;
}) {
  return db.socialLinks.update({
    where: {
      userId_platform: {
        userId,
        platform,
      },
    },
    data: {
      url,
    },
  });
}

function createSocialLink({
  userId,
  platform,
  url,
}: {
  userId: string;
  platform: string;
  url: string;
}) {
  return db.socialLinks.create({
    data: {
      userId,
      platform,
      url,
    },
  });
}

export async function updateIfExitsOrCreate({
  userId,
  platform,
  url,
}: {
  userId: string;
  platform: string;
  url: string;
}) {
  return userHasPlatformLink(userId, platform).then((exists) => {
    if (exists) {
      return updateSocialLink({ userId, platform, url });
    }
    return createSocialLink({ userId, platform, url });
  });
}

export async function getUsersLinks({ userId }: { userId: string }) {
  return db.socialLinks.findMany({
    where: {
      userId,
    },
  });
}

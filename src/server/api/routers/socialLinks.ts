import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { getUsersLinks, updateIfExitsOrCreate } from "~/models/socialLinks";

const socialLinksRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input }) => {
      return getUsersLinks({ userId: input.userId });
    }),
  update: protectedProcedure
    .input(
      z.object({
        links: z.array(
          z.object({
            name: z.string(),
            url: z.string(),
          }),
        ),
      }),
    )
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      return Promise.all(
        input.links.map((link) =>
          updateIfExitsOrCreate({
            userId: userId,
            platform: link.name,
            url: link.url,
          }),
        ),
      );
    }),
});

export default socialLinksRouter;

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const socialLinksRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.socialLinks.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),
});

export default socialLinksRouter;

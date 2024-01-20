import { publicProcedure, router } from "./trpc";

/**
 * All routes / endpoints to be declared here
 */
export const appRouter = router({
  
  test : publicProcedure.query(() => {
    return 'Hello Test '
  })
})


export type AppRouter = typeof appRouter
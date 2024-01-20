import { initTRPC } from "@trpc/server";


const t = initTRPC.create()

export const router = t.router;


/**
 * Public Procedure is mainly for endpoints 
 * which any one call (Authentication not required)
 */
export const publicProcedure = t.procedure;

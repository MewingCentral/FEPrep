/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { Context, Input } from "hono";

import type { Session, User } from "@feprep/auth";

export type Variables = {
  user: User | null;
  session: Session | null;
};

export type Bindings = {
  DATABASE_URL: string;
  DATABASE_TOKEN: string;
};

export interface HonoConfig {
  Variables: Variables;
  Bindings: Bindings;
}

export type HonoContext<
  P extends string = string,
  I extends Input = Input,
> = Context<HonoConfig, P, I>;

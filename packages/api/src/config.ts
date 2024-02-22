/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { Session, User } from "@feprep/auth";

export type Variables = {
  user: User | null;
  session: Session | null;
};

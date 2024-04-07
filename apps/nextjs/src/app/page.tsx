import Link from "next/link";

import { Button } from "@feprep/ui/button";

import "@feprep/ui";

export const runtime = "edge";

export default async function HomePage() {
  return (
    <div className="flex flex-row flex-cols-2 items-start justify-center">
      <div className="ml-12">
        <h1 className="mb-4 text-left text-6xl font-semibold">FEPrep</h1>
        <h2 className="mb-4 max-w-sm text-left text-3xl font-normal leading-normal">
          A new way to prepare for the Foundation Exam.
        </h2>
        <div className="flex flex-row gap-5">
          <Link href="/explore">
            <Button type="submit">Start Practicing</Button>
          </Link>
          <Link href="/sign-up">
            <Button
              type="submit"
              className="rounded-md border border-input bg-background text-accent-foreground transition-colors hover:bg-accent "
            >
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

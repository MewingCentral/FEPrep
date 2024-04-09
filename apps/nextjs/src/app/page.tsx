import Link from "next/link";

import { Button } from "@feprep/ui/button";

import "@feprep/ui";

import { HeartIcon } from "@radix-ui/react-icons";

export const runtime = "edge";

export default async function HomePage() {
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center">
        <div>
          <h1 className="mb-4 text-left text-6xl font-semibold">FEPrep</h1>
          <h2 className="mb-4 text-left text-3xl font-normal leading-normal">
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
      <div className="flex flex-1 flex-col items-center justify-center">
        <div>
          <h2 className="mb-4 text-left text-3xl font-normal leading-normal text-red-500">
            Made with <HeartIcon /> in central Florida.
          </h2>
          <div className="flex flex-row gap-5">
            <Link href="/explore">
              <Button type="submit">Start Practicing</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

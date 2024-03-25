import Image from "next/image";
import Link from "next/link";

import { Button } from "@feprep/ui/button";

import "@feprep/ui";

export const runtime = "edge";

export default async function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-start justify-center">
      <div className="ml-12">
        <Image
          src="/mew.png"
          width={120}
          height={120}
          alt="FEPrep Logo, :3 doggy"
          className="mb-8 rounded-md shadow-md"
        />
        <h1 className="mb-4  text-left text-6xl font-semibold">FEPrep</h1>
        <h2 className="mb-4  max-w-sm text-left text-3xl font-normal leading-normal">
          A new way to prepare for the Foundation Exam.
        </h2>
        <div className="flex flex-row gap-5">
          <Link href="/problems/page">
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

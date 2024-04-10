"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@feprep/ui/button";

import "@feprep/ui";

import { ChevronDownIcon, HeartFilledIcon } from "@radix-ui/react-icons";

export const runtime = "edge";

export default function HomePage() {
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center">
        <div>
          <h1 className="mb-2 flex flex-row items-center gap-4 text-left text-6xl font-semibold">
            FEPrep{" "}
            <Image
              src="/ellipse.svg"
              className="h-[50px] w-auto"
              width={50}
              height={50}
              alt="FEPrep Logo"
            />
          </h1>
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
        <div className="translate-y-60 transform">
          <ChevronDownIcon
            className="mt-14 h-auto w-[40px] animate-bounce hover:cursor-pointer"
            onClick={() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            }}
          />
        </div>
      </div>
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center gap-2">
        <div className="flex flex-row content-center items-center justify-center gap-2 text-3xl font-normal leading-normal text-red-500">
          <h2 className="font-semibold">Made with</h2>
          <Link href="/about">
            <HeartFilledIcon className="h-[45px] w-auto transition-all duration-500 ease-in-out hover:scale-110 hover:cursor-pointer hover:text-foreground" />
          </Link>
          <h2 className="font-semibold">in central Florida.</h2>
        </div>
        <p className="mx-4 w-3/4 text-center text-xl lg:mx-16">
          <Link href="https://www.ucf.edu/" className="underline">
            <b>UCF</b>
          </Link>{" "}
          strives to help every student unleash their greatest potential.
          Through a competitive curriculum and high academic excellence upheld
          by standardized tests like the{" "}
          <Link
            href="https://www.cs.ucf.edu/ucf_section/foundation-exam/"
            className="underline"
          >
            <b>Foundation Exam</b>
          </Link>
          , students and alumni from the College of Engineering and Computer
          Science are employed at top companies across the nation. With this
          app, we aim to help you on this journey as you reach for the stars.
        </p>
        <Image
          src="/ucf.svg"
          className="mt-4 h-[120px] w-auto text-foreground dark:invert"
          width={50}
          height={50}
          alt="UCF Logo"
        />
      </div>
    </>
  );
}

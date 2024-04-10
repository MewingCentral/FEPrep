"use client";

import Image from "next/image";
import Link from "next/link";

import "@feprep/ui";

import { HeartFilledIcon } from "@radix-ui/react-icons";

export const runtime = "edge";

export default function About() {
  return (
    <>
      <div className="mt-8 flex flex-1 flex-col items-center justify-start">
        <h1 className="mb-2 flex flex-row items-center gap-4 text-left text-6xl font-semibold">
          Meet the Developers{" "}
        </h1>
      </div>
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
        strives to help every student unleash their greatest potential. Through
        a competitive curriculum and high academic excellence upheld by
        standardized tests like the{" "}
        <Link
          href="https://www.cs.ucf.edu/ucf_section/foundation-exam/"
          className="underline"
        >
          <b>Foundation Exam</b>
        </Link>
        , students and alumni from the College of Engineering and Computer
        Science are employed at top companies across the nation. With this app,
        we aim to help you on this journey as you reach for the stars.
      </p>
      <Image
        src="/ucf.svg"
        className="mt-4 h-[120px] w-auto text-foreground dark:invert"
        width={50}
        height={50}
        alt="UCF Logo"
      />
    </>
  );
}

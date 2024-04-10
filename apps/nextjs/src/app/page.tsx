"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@feprep/ui/button";

import "@feprep/ui";

import { ChevronDownIcon, HeartFilledIcon } from "@radix-ui/react-icons";

export const runtime = "edge";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-background from-50% to-border">
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center">
        <div>
          <h1 className="mb-2 flex flex-row items-center gap-4 text-left text-6xl font-semibold">
            FEPrep{" "}
            <motion.a
              initial={{ opacity: 0, scale: 0.8, x: -35 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                duration: 4,
                delay: 0.25,
                ease: [0, 0.41, 0.2, 1.01],
              }}
              className="flex flex-row items-center"
              href="https://github.com/MewingCentral/FEPrep"
              target="_blank"
            >
              <Image
                src="/ellipse.svg"
                className="h-[50px] w-auto transition-all duration-200 hover:scale-110 hover:cursor-pointer"
                width={50}
                height={50}
                alt="FEPrep Logo"
              />
            </motion.a>
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
        <motion.span
          initial={{ opacity: 0, scale: 0.5, y: 200 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 3,
            delay: 2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          {" "}
          <div className="translate-y-60 transform">
            <ChevronDownIcon
              className="mt-14 h-auto w-[50px] animate-bounce hover:cursor-pointer"
              onClick={() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }}
            />
          </div>
        </motion.span>
      </div>
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center gap-2 ">
        <div className="flex flex-row content-center items-center justify-center gap-2 whitespace-nowrap text-xl font-normal leading-normal text-red-500 md:text-3xl">
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
      </div>
    </div>
  );
}

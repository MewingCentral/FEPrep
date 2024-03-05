import Image from "next/image";
import Link from "next/link";

// import { User } from "@feprep/auth";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LapTimerIcon,
  RocketIcon,
  ShuffleIcon,
} from "@feprep/ui";

export function Nav() {
  return (
    <main className="flex flex-row justify-start p-10">
      {/* left side */}
      <div className="flex flex-row gap-3">
        <Image src="/Ellipse-3.svg" width={25} height={25} alt="FEPrep Logo" />
        <Link
          href="/"
          className="link link-underline link-underline-black text-left text-xl font-semibold transition-all duration-300 ease-in-out"
        >
          FEPrep
        </Link>
        {/* add div line here */}
        <Link
          className="text-slate link link-underline-show text-left text-xl font-normal"
          href="/dashboard"
        >
          Topics
        </Link>
        <ArrowLeftIcon width="25" height="25" />
        <ArrowRightIcon width="25" height="25" />
        <ShuffleIcon width="25" height="25" />
      </div>
      <div className="flex grow flex-row justify-center gap-2">
        <LapTimerIcon width="25" height="25" />
        <h1 className="text-slate text-left text-xl font-normal ">Timer</h1>
        <RocketIcon width="25" height="25" className="" />
        <h1 className="text-slate text-left text-xl font-medium ">Solution</h1>
      </div>
      <div className="flex flex-row-reverse items-end gap-3">
        <h1 className="text-slate text-left text-xl font-medium ">NID</h1>
        <h1 className="text-slate text-left text-xl font-normal ">Welcome,</h1>
      </div>
    </main>
  );
}

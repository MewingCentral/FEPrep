import Image from "next/image";

import { User } from "@feprep/auth";
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
        <h1 className="text-left text-xl font-semibold">FEPrep</h1>
        {/* add div line here */}
        <h1 className="text-slate text-left text-xl font-normal text-slate-500 underline">
          Topics
        </h1>
        <ArrowLeftIcon width="25" height="25" className="text-slate-500" />
        <ArrowRightIcon width="25" height="25" className="text-slate-500" />
        <ShuffleIcon width="25" height="25" className="text-slate-500" />
      </div>
      <div className="flex grow flex-row justify-center gap-2">
        <LapTimerIcon width="25" height="25" className="text-slate-500" />
        <h1 className="text-slate text-left text-xl font-normal text-slate-500">
          Timer
        </h1>
        <RocketIcon width="25" height="25" className="text-slate-700" />
        <h1 className="text-slate text-left text-xl font-normal text-slate-700">
          Solution
        </h1>
      </div>
      <div className="flex flex-row-reverse items-end gap-3">
        <h1 className="text-slate text-left text-xl font-normal text-slate-700">
          NID
        </h1>
        <h1 className="text-slate text-left text-xl font-normal text-slate-500">
          Welcome,
        </h1>
      </div>
    </main>
  );
}

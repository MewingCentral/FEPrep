import Image from "next/image";

import { User } from "@feprep/auth";

// import { Left } from "@feprep/ui/arrow-left.svg";
// import { Right } from "@feprep/ui/arrow-right.svg";
// import Left from "@feprep/ui/arrow-left.svg";
// import LeftArrow from "./LeftArrow";
// import RightArrow from "./RightArrow";
// import {ArrowLeftIcon, ArrowRightIcon} from "@feprep/ui"

export function Nav() {
  return (
    <main className="flex flex-row gap-3 p-10">
      <Image src="/Ellipse-3.svg" width={25} height={25} alt="FEPrep Logo" />
      <h1 className="text-left text-xl font-semibold">FEPrep</h1>
      {/* add div line here */}
      <h1 className="text-slate text-left text-xl font-normal text-slate-500">
        Topics
      </h1>
      <h1 className="text-slate text-left text-xl font-normal text-slate-500">
        Timer
      </h1>
      <h1 className="text-slate text-left text-xl font-normal text-slate-900">
        Solution
      </h1>
      {/* <LeftArrow /> */}
      {/* <RightArrow /> */}
    </main>
  );
}

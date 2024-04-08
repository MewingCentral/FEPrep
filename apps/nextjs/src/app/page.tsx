import Link from "next/link";

// https://tailwindui.com/components/marketing/sections/content-sections
import { Button } from "@feprep/ui/button";

// import "@feprep/ui";

// export const runtime = "edge";

export default async function HomePage() {
  return (
    <section className="">
      {/* opening div for the screen divider  */}
      <div className="grid h-screen grid-rows-5">
        {/* 1st row for the FEPrep header in upper right corner. */}
        <div className="bg-muted-foreground">
          <div className="ml-12">
            <h1 className="mr-10 mt-8 text-right text-3xl font-semibold text-foreground ">
              {"FEPrep"}
            </h1>
          </div>
        </div>

        {/* 2nd row: mission statement. */}
        <div className="bg-muted-foreground">
          <h2 className="mb-4 mr-28 text-right text-3xl font-normal">
            {"A new way to prepare for the Foundation Exam."}
          </h2>
        </div>

        {/* 3rd row for the buttons. */}
        <div className="grid grid-flow-row grid-cols-3 bg-muted-foreground">
          <div className=""></div>
          <div className="justify-self-center">
            <Link href="/sign-up">
              <Button
                type="submit"
                className="ml-28 w-44 rounded-md border border-input bg-white text-black transition-colors hover:bg-accent"
              >
                {"Create Account"}
              </Button>
            </Link>
          </div>
          <div className="">
            <Link href="/explore">
              <Button
                type="submit"
                className="ml-20 w-44 content-center rounded-md border-input text-white transition-colors hover:bg-accent"
              >
                {"Start Practicing"}
              </Button>
            </Link>
          </div>
        </div>

        {/* 4th row: made with love statement. */}
        <div className="grid grid-flow-col grid-rows-2 bg-white">
          <div className="bg-white">
            <p className="font-regular mt-8 text-center text-red-600">
              {"Made with in Central Florida"}
            </p>
          </div>
          <div className="bg-white">
            <p className="text-center text-xs font-medium">
              {
                "UCF strives to help every student unleash their greatest potential. Through a competitive curriculum and high academic excellence"
              }{" "}
              <br />
              {
                "upheld by standardized tests like the Foundation Exam, students and alumni from the College of Engineering and Computer Science are"
              }{" "}
              <br />
              {
                "employed at top companies across the nation. With this app, we aim to help you on this journey as you reach for the stars."
              }{" "}
              <br />
            </p>
          </div>
        </div>

        {/* 5th row for the icons */}
        <div className="grid grid-flow-col grid-rows-2">
          <div className="bg-white"></div>
          <div className="bg-white"></div>
        </div>

        {/* closing div */}
      </div>
    </section>
  );
}

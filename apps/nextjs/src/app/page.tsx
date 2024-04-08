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
            <h1 className="text-foreground mt-8 mr-10 text-right text-3xl font-semibold "> 
              {"FEPrep"}
            </h1>
          </div>
        </div>
      

        {/* 2nd row: mission statement. */}
        <div className="bg-muted-foreground">
          <h2 className="mb-4 mr-16 text-3xl text-right font-normal">
            {"A new way to prepare for the Foundation Exam."}
          </h2>
        </div>


        {/* 3rd row for the buttons. */}
        <div className="bg-muted-foreground">
          <div className="flex flex-row gap-5">
            <Link href="/explore">
              <Button type="submit">
                {"Start Practicing"}
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button type="submit"
                className="rounded-md border border-input bg-white text-black transition-colors hover:bg-accent">
                  {"Create Account"}
              </Button>
            </Link>
          </div>
        </div>


        {/* 4th row: made with love statement. */}
        <div className="bg-white grid grid-rows-2 grid-flow-col">
          <div className="bg-white">
            <p className="mt-8 text-red-600 text-center font-regular"> 
              {"Made with in Central Florida"}
            </p>
          </div>
          <div className="bg-white">
            <p className="text-xs text-center font-medium">
              {"UCF strives to help every student unleash their greatest potential. Through a competitive curriculum and high academic excellence"} <br/>
              {"upheld by standardized tests like the Foundation Exam, students and alumni from the College of Engineering and Computer Science are"} <br/>
              {"employed at top companies across the nation. With this app, we aim to help you on this journey as you reach for the stars."} <br/>
            </p>
          </div>
        </div>


        {/* 5th row for the icons */}
        <div className="grid grid-rows-2 grid-flow-col">
          <div className="bg-white"></div>
          <div className="bg-white"></div>
        </div>


      {/* closing div         */}
      </div>

    </section>

  );
}

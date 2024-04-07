//import Link from "next/link";
// https://tailwindui.com/components/marketing/sections/content-sections
// //import { Button } from "@feprep/ui/button";

// import "@feprep/ui";

// export const runtime = "edge";

export default async function HomePage() {
  return (

    <section className="">
    
      <div className="grid h-screen grid-rows-5">
        
        <div className="bg-muted-foreground">
          <div className="ml-12">
            <h1 className="text-foreground mt-8 mr-10 text-right text-3xl font-semibold "> 
              {"FEPrep"}
            </h1>
          </div>
     
        </div>
      
        <div className="bg-muted-foreground"></div>

        <div className="bg-muted-foreground"></div>
      
        <div className="bg-white"></div>

        <div className="bg-white"></div>
        
      </div>

    </section>

  );
}

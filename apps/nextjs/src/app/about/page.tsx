import { validateRequest } from "@feprep/auth";

import { Nav } from "./nav";

export default async function AboutUs() {
    const { user } = await validateRequest();
  
    return (
        <section className="">
            <Nav user={user} />
            <div className="py-4 mb-4 space-y-16">
                <h2 className="font-heading text-black text-4xl font-semibold text-foreground text-center">
                    {"Meet the Developers"}
                </h2>
            </div>

                <div className="grid h-screen grid-rows-2">
                    <div className="bg-lime-400"></div>
                    <div className="bg-pink-500"></div>
                </div>
        </section>
    );
}

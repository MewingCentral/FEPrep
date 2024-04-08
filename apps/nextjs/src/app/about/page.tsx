import { validateRequest } from "@feprep/auth";

import { Nav } from "./nav";

export default async function AboutUs() {
    const { user } = await validateRequest();
  
    return (
        <section className="">
            <Nav user={user} />
            <div className="grid h-screen grid-rows-2">
                <div className="bg-lime-400"></div>
                <div className="bg-pink-500"></div>
            </div>
        </section>
    );
}

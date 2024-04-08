import { validateRequest } from "@feprep/auth";

import { Nav } from "./nav";

export default async function About() {
    const { user } = await validateRequest();
  
    return (
        <section className="">
            <Nav user={user} />
            <div className="grid h-screen grid-rows-3">
                <div className="bg-green-400"></div>
                <div className="bg-indigo-500"></div>
                <div className="bg-yellow-300"></div>
            </div>
        </section>
    );
}

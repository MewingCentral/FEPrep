import { validateRequest } from "@feprep/auth";

import { Nav } from "./nav";

export default async function Explore() {
    const { user } = await validateRequest();
  
    return (
        <section className="">
            <Nav user={user} />

        </section>
    );
}

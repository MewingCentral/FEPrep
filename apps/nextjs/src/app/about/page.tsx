import { validateRequest } from "@feprep/auth";

import { Nav } from "./nav";

export default async function AboutUs() {
  const { user } = await validateRequest();

  return (
    <section className="">
      <Nav user={user} />
      <div className="mb-4 space-y-16 py-4">
        <h2 className="font-heading text-center text-4xl font-semibold text-black text-foreground">
          {"Meet the Developers"}
        </h2>
      </div>

      <div className="grid h-screen grid-rows-2">
        <div className="grid grid-flow-row grid-cols-4">
          <div className="bg-lime-400"></div>
          <div className="bg-pink-500"></div>
          <div className="bg-orange-500"></div>
          <div className="bg-sky-400"></div>
        </div>
        <div className="grid grid-flow-row grid-cols-3">
          <div className="bg-indigo-500"></div>
          <div className="bg-green-700"></div>
          <div className="bg-red-600"></div>
        </div>
      </div>
    </section>
  );
}

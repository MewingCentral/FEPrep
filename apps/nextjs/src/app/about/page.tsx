import Image from "next/image";

import { validateRequest } from "@feprep/auth";

import { Nav } from "./nav";

export default async function AboutUs() {
  const { user } = await validateRequest();

  const developers = [
    {
      name: "Caleb",
      role: "Project Manager",
      image: `/photos/Caleb.jpg`,
    },
    {
      name: "Anna",
      role: "Mobile",
      image: `/photos/Anna.jpg`,
    },
    {
      name: "Pharit",
      role: "Frontend Web",
      image: `/photos/Pharit.jpeg`,
    },
    {
      name: "Pharit",
      role: "Frontend Web",
      image: `/photos/Pharit.jpeg`,
    },
    {
      name: "Pharit",
      role: "Frontend Web",
      image: `/photos/Pharit.jpeg`,
    },
    {
      name: "Pharit",
      role: "Frontend Web",
      image: `/photos/Pharit.jpeg`,
    },
  ];

  return (
    <section className="">
      <Nav user={user} />
      <div className="mb-4 space-y-16 py-4">
        <h2 className="font-heading text-center text-4xl font-semibold text-black text-foreground">
          {"Meet the Developers"}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-rows-2 md:grid-cols-4 gap-4">
        {developers.map((dev) => (
          <div key={dev.name}>
            <div className="rounded-full overflow-hidden w-[150px] h-[150px] mx-auto">
              <Image
                objectPosition=""
                src={dev.image}
                alt={`Image of ${dev.name}`}
                width={150}
                height={150}
              />
            </div>

            <div className="text-center">{dev.name}</div>

            <div className="text-center">{dev.role}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 grid-flow-row md:grid-cols-3 gap-4">
        <div className="bg-indigo-500"></div>
        <div className="bg-green-700"></div>
        <div className="bg-red-600"></div>
      </div>
    </section>
  );
}

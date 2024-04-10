import Image from "next/image";

import { validateRequest } from "@feprep/auth";

import { Nav } from "./nav";

export default async function AboutUs() {
  const { user } = await validateRequest();

  const developersFirst = [
    {
      name: "Caleb Rivera",
      role: "Project Manager",
      image: `/photos/Caleb.jpg`,
    },
    {
      name: "Quan Nguyen",
      role: "Database / Front End - Web",
      image: `/photos/Quan.jpg`,
    },
    {
      name: "Pharit Smitasin",
      role: "Front End Web - Web",
      image: `/photos/Pharit.jpg`,
    },
    {
      name: "Luis Infante",
      role: "Front End - Web",
      image: `/photos/Luis.png`,
    },
  ];

  const developersSecond = [
    {
      name: "Daniel Palma",
      role: "API",
      image: `/photos/Daniel.jpg`,
    },
    {
      name: "Anna Macinnis",
      role: "Frontend Web - Mobile",
      image: `/photos/Anna.jpg`,
    },
    {
      name: "Annalisa Easton Vitulli",
      role: "Front End - Mobile",
      image: `/photos/Annalisa.PNG`,
    },
  ];

  return (
    <section className="">
      <Nav user={user} />
      <div className="mb-4 space-y-16 py-4">
        <h2 className="font-heading text-center text-4xl font-semibold text-black text-foreground">
          {"Meet the Developers"} <br />
        </h2>
        <p className="font-heading text-center text-2xl font-semibold text-black text-foreground">
          {"Spring 2024"} <br />
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {developersFirst.map((dev) => (
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
            <div className="text-center mb-12">{dev.role}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {developersSecond.map((dev) => (
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

    </section>
  );
}

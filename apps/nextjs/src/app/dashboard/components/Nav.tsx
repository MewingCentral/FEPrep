import Image from "next/image";

export function Nav() {
  return (
    <main className="flex flex-row gap-3 p-10">
      <Image src="/Ellipse-3.svg" width={25} height={25} alt="FEPrep Logo" />
      <h1 className="text-left text-xl font-semibold">FEPrep</h1>
      {/* add div line here */}
    </main>
  );
}

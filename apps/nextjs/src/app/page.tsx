import { HelloClient } from "./_components/hello-client";
import { HelloServer } from "./_components/hello-server";

export const runtime = "edge";

export default async function HomePage() {
  return (
    <main>
      <HelloClient />
      <HelloServer />
    </main>
  );
}

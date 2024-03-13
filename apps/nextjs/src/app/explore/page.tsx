import { Tabs, TabsContent, TabsList, TabsTrigger } from "@feprep/ui/tabs";

import { Nav } from "./nav";
import { ProblemsTab } from "./problems-tab";
import { StudySetsTab } from "./study-sets-tab";

export default function Explore() {
  return (
    <div className="mx-auto flex h-screen w-full max-w-screen-lg flex-col">
      <Nav />
      <Tabs
        className="flex flex-1 flex-col p-6 lg:min-h-0"
        defaultValue="problems"
      >
        <div className="mb-8 flex items-center justify-between">
          <TabsList className="mr-2">
            <TabsTrigger value="problems">Problems</TabsTrigger>
            <TabsTrigger value="study">Study Sets</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="problems">
          <ProblemsTab />
        </TabsContent>
        <TabsContent
          className="flex flex-1 flex-col gap-4 md:min-h-0 lg:flex-row"
          value="study"
        >
          <StudySetsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

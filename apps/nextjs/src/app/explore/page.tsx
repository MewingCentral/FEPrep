import { Button } from "@feprep/ui/button";
import { Input } from "@feprep/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@feprep/ui/tabs";

import { Nav } from "./nav";
import { ProblemsTab } from "./problems-tab";
import { StudySetsTab } from "./study-sets-tab";

export default function Explore() {
  return (
    <div className="flex flex-col lg:h-screen">
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
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search" />
            <Button type="submit">Search</Button>
          </div>
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

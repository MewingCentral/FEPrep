import { Badge } from "@feprep/ui/badge";
import { Button } from "@feprep/ui/button";
import { Input } from "@feprep/ui/input";
import { ScrollArea, ScrollBar } from "@feprep/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@feprep/ui/tabs";

import { Nav } from "./nav";

export default function Explore() {
  return (
    <>
      <Nav />
      <div className="px-6">
        <Tabs defaultValue="problems">
          <div className="mb-8 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="study">Study Sets</TabsTrigger>
            </TabsList>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" placeholder="Search" />
              <Button type="submit">Search</Button>
            </div>
          </div>

          <TabsContent value="problems">
            <div className="flex flex-col gap-8">
              {new Array(5).fill(null).map((_, index) => (
                <div key={index}>
                  <h1 className="mb-4 text-xl font-semibold">
                    Category {index + 1}
                  </h1>
                  <ScrollArea key={index}>
                    <div className="flex w-max space-x-4 pb-4">
                      {new Array(10).fill(null).map((_, index) => (
                        <div
                          className="w-80 rounded-md bg-accent p-4"
                          key={index}
                        >
                          <div className="flex text-lg font-semibold">
                            <div>Problem {index + 1}</div>
                          </div>
                          <div className="mb-2 text-sm text-accent-foreground">
                            Spring 2024
                          </div>
                          <div className="flex gap-2">
                            {new Array(3).fill(null).map((_, index) => (
                              <Badge
                                variant="outline"
                                className="bg-background text-foreground"
                                key={index}
                              >
                                Tag {index + 1}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="study">Study</TabsContent>
        </Tabs>
      </div>
    </>
  );
}

import { Badge } from "@feprep/ui/badge";
import { Button } from "@feprep/ui/button";
import { Input } from "@feprep/ui/input";
import { ScrollArea, ScrollBar } from "@feprep/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@feprep/ui/tabs";

import { Nav } from "./nav";

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
          <div className="flex flex-col gap-8">
            {new Array(5).fill(null).map((_, index) => (
              <div key={index}>
                <h1 className="mb-4 text-xl font-semibold">
                  Category {index + 1}
                </h1>
                <ScrollArea key={index}>
                  <div className="flex space-x-4 pb-4">
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
        <TabsContent
          className="flex flex-1 flex-col gap-4 md:min-h-0 lg:flex-row"
          value="study"
        >
          <ScrollArea className="rounded-md border p-8 md:flex-1">
            <div className="mb-8">
              <h1 className="mb-4 text-2xl font-semibold">
                Study your favorites
              </h1>
              <div className="relative h-48 rounded-md bg-accent p-4">
                <div className="mb-2 text-xl font-semibold">My Favorites</div>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <div className="absolute bottom-4 left-4">
                  {Math.floor(Math.random() * 20)} problems
                </div>
              </div>
            </div>

            <div className="mb-4 flex justify-between">
              <h1 className="text-2xl font-semibold">My sets</h1>
              <Button>Add</Button>
            </div>
            <div className="flex flex-col gap-4">
              {new Array(4).fill(null).map((_, index) => (
                <div
                  className="relative h-48 rounded-md bg-accent p-4"
                  key={index}
                >
                  <div className="mb-2 text-xl font-semibold">
                    Study Set {index + 1}
                  </div>
                  <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </div>
                  <div className="absolute bottom-4 left-4">
                    {Math.floor(Math.random() * 20)} problems
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <ScrollArea className="rounded-md border p-8 md:flex-[2]">
            <h1 className="mb-4 text-2xl font-semibold">Our Sets</h1>
            <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
              {new Array(8).fill(null).map((_, index) => (
                <div
                  className="relative h-48 rounded-md bg-accent p-4"
                  key={index}
                >
                  <div className="mb-2 text-xl font-semibold">
                    Study Set {index + 1}
                  </div>
                  <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </div>
                  <div className="absolute bottom-4 left-4">
                    {Math.floor(Math.random() * 20)} problems
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

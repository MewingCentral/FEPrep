import { Button } from "@feprep/ui/button";
import { ScrollArea } from "@feprep/ui/scroll-area";

export function StudySetsTab() {
  return (
    <>
      <ScrollArea className="rounded-md border p-8 md:flex-1">
        <div className="mb-8">
          <h1 className="mb-4 text-2xl font-semibold">Study your favorites</h1>
          <div className="relative h-48 w-full rounded-md bg-accent p-4">
            <div className="mb-2 text-xl font-semibold">My Favorites</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
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
              className="relative h-48 w-full rounded-md bg-accent p-4"
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

      <ScrollArea className="rounded-md border p-8 md:flex-1">
        <h1 className="mb-4 text-2xl font-semibold">Our Sets</h1>
        <div className="flex flex-col gap-4">
          {new Array(8).fill(null).map((_, index) => (
            <div
              className="relative h-48 w-full rounded-md bg-accent p-4"
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
    </>
  );
}

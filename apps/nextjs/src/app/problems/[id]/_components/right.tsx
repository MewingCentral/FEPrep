import dynamic from "next/dynamic";

import type { RouterOutputs } from "@feprep/api";
import { ChatBubbleIcon, Pencil1Icon, VideoIcon } from "@feprep/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@feprep/ui/tabs";

import { DiscussionTab } from "./discussion-tab";
import { ResourcesTab } from "./resources-tab";

const ExcalidrawWithClientOnly = dynamic(
  async () => (await import("./excalidraw-wrapper")).default,
  {
    ssr: false,
  },
);

export async function Right({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  return (
    <Tabs defaultValue="whiteboard">
      <div className="mb-6 flex flex-row items-center justify-between gap-4">
        <TabsList>
          <TabsTrigger value="whiteboard">
            <Pencil1Icon className="mr-2" />
            Whiteboard
          </TabsTrigger>
          <TabsTrigger value="discussion">
            <ChatBubbleIcon className="mr-2" />
            Discussion
          </TabsTrigger>
          <TabsTrigger value="resources">
            <VideoIcon className="mr-2" />
            Resources
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="discussion">
        <DiscussionTab question={question} />
      </TabsContent>
      <TabsContent value="resources">
        <ResourcesTab question={question} />
      </TabsContent>
      <TabsContent value="whiteboard" className="h-[70vh]">
        <ExcalidrawWithClientOnly />
      </TabsContent>
    </Tabs>
  );
}

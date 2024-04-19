import type { RouterOutputs } from "@feprep/api";
import { ChatBubbleIcon, VideoIcon } from "@feprep/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@feprep/ui/tabs";
import { Excalidraw } from "@excalidraw/excalidraw";

import { DiscussionTab } from "./discussion-tab";
import { ResourcesTab } from "./resources-tab";

export async function Right({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  return (
    <div>
      <Tabs defaultValue="resources">
        <div className="mb-6 flex flex-row items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="whiteboard">
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
        <TabsContent value="whiteboard">
          <Excalidraw />
        </TabsContent>
      </Tabs>
    </div>
  );
}

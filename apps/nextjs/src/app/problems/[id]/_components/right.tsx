import type { RouterOutputs } from "@feprep/api";
import { ChatBubbleIcon, FileIcon, VideoIcon } from "@feprep/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@feprep/ui/tabs";

import { DiscussionTab } from "./discussion-tab";
import { NotesTab } from "./notes-tab";
import { ResourcesTab } from "./resources-tab";

export async function Right({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  return (
    <div className="flex-none rounded-md border p-4 lg:basis-1/2">
      <Tabs defaultValue="notes">
        <TabsList className="mb-4">
          <TabsTrigger value="discussion">
            <ChatBubbleIcon className="mr-2" />
            Discussion
          </TabsTrigger>
          <TabsTrigger value="notes">
            <FileIcon className="mr-2" />
            Notes
          </TabsTrigger>
          <TabsTrigger value="resources">
            <VideoIcon className="mr-2" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discussion">
          <DiscussionTab question={question} />
        </TabsContent>
        <TabsContent value="notes" asChild>
          <NotesTab />
        </TabsContent>
        <TabsContent value="resources" asChild>
          <ResourcesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

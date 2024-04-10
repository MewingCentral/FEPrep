import type { RouterOutputs } from "@feprep/api";
import type { User } from "@feprep/auth";
import { ChatBubbleIcon, PlusIcon, VideoIcon } from "@feprep/ui";
import { Button } from "@feprep/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@feprep/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@feprep/ui/tabs";

import { AddResourceForm } from "./add-resource-form";
import { DiscussionTab } from "./discussion-tab";
import { ResourcesTab } from "./resources-tab";

export async function Right({
  question,
  user,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
  user: User | null;
}) {
  return (
    <div>
      <Tabs defaultValue="resources">
        <div className="flex flex-row items-center justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="discussion">
              <ChatBubbleIcon className="mr-2" />
              Discussion
            </TabsTrigger>
            <TabsTrigger value="resources">
              <VideoIcon className="mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>
          {/* if the user is a teacher, then show the button to add resources */}
          {user?.type === "Teacher" && (
            <AddResourceButton question={question} />
          )}
        </div>

        <TabsContent value="discussion">
          <DiscussionTab question={question} />
        </TabsContent>
        <TabsContent value="resources">
          <ResourcesTab question={question} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AddResourceButton({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add Resource</SheetTitle>
          <SheetDescription>
            Add a link to a resource for this question.
          </SheetDescription>
        </SheetHeader>
        <AddResourceForm question={question} />
      </SheetContent>
    </Sheet>
  );
}

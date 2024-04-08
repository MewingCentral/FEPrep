import type { RouterOutputs } from "@feprep/api";
// import type { User } from "@feprep/auth";
import { ChatBubbleIcon, FileIcon, PlusIcon, VideoIcon } from "@feprep/ui";
import { Button } from "@feprep/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@feprep/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@feprep/ui/tabs";

// import { CreateQuestionForm } from "~/app/explore/create-question-form";
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
        <div className="flex flex-row justify-between">
          <TabsList>
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
          <Button>
            <PlusIcon className=" h-4 w-4" />
            Add Resource
          </Button>
        </div>

        <TabsContent value="discussion">
          <DiscussionTab question={question} />
        </TabsContent>
        <TabsContent value="notes" asChild>
          <NotesTab />
        </TabsContent>
        <TabsContent value="resources" asChild>
          <ResourcesTab question={question} />
          {/* <AddResourceButton user={user} /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// function AddResourceButton({ user }: { user: User }) {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button>
//           <PlusIcon className="mr-2 h-4 w-4" />
//           Add Resource
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-[400px] sm:w-[540px]">
//         <SheetHeader>
//           <SheetTitle>Create Question</SheetTitle>
//           <SheetDescription>
//             Fill out the form below to create a new question to be added to the
//             site!
//           </SheetDescription>
//         </SheetHeader>
//         <CreateQuestionForm user={user} />
//       </SheetContent>
//     </Sheet>
//   );
// }

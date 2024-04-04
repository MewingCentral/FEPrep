import { DotsHorizontalIcon, FileIcon, VideoIcon } from "@feprep/ui";
import { Card, CardHeader } from "@feprep/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@feprep/ui/tabs";
import { NotesTab } from "./notes-tab";
import { DiscussionTab } from "./discussion-tab";
import { ResourcesTab } from "./resources-tab";


export function Right() {
  return (
    <Card className="flex h-full flex-col overflow-auto border-none">
      {/* top right */}
      <CardHeader className="top-section justify-left w-full flex-1 flex-row gap-2 rounded-xl border p-3">
        <div className="mx-auto flex h-screen w-full max-w-screen-lg flex-col">
          <Tabs
            className="flex flex-1 flex-col p-6 lg:min-h-5"
            defaultValue="notes"
          >
            <TabsList className="h-15 mb-8 self-start">
              <TabsTrigger value="discussion">
                <div className="mt-1 flex cursor-pointer flex-row transition-all duration-200 hover:text-muted-foreground">
                  <DotsHorizontalIcon width="25" height="25" />
                  <h1 className="text-slate font-small ml-2 mr-2 text-left text-xl">
                    Discussion
                  </h1>
                </div>
              </TabsTrigger>
              <TabsTrigger value="notes">
                <div className="ml-1 mt-1 flex cursor-pointer flex-row transition-all duration-200 hover:text-muted-foreground">
                  <FileIcon width="25" height="25" />
                  <h1 className="text-slate font-small ml-1.5 mr-2 text-left text-xl">
                    Notes
                  </h1>
                </div>
              </TabsTrigger>
              <TabsTrigger value="resources">
                <div className="ml-2 mt-1 flex cursor-pointer flex-row transition-all duration-200 hover:text-muted-foreground">
                  <VideoIcon width="25" height="25" />
                  <h1 className="text-slate font-small ml-2 text-left text-xl">
                    Resources
                  </h1>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notes">
              <NotesTab />
            </TabsContent>

            <TabsContent value="resources">
              <ResourcesTab />
              {/* <div>hewwo</div> */}
            </TabsContent>

          </Tabs>
        </div>
      </CardHeader>
    </Card>
  );
}

import { DotsHorizontalIcon, FileIcon, VideoIcon } from "@feprep/ui";
import { Card, CardHeader } from "@feprep/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@feprep/ui/tabs";
import { NotesTab } from "./notes-tab";
// import { QuestionsTab } from "./../../explore/questions-tab";
// import { StudySetsTab } from "./../../explore/study-sets-tab";

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
            <TabsList className="mb-8 self-start h-15">
              <TabsTrigger value="discussion">
                <div className="mt-1 flex flex-row hover:text-muted-foreground transition-all duration-200 cursor-pointer">
                  <DotsHorizontalIcon width="25" height="25" />
                  <h1 className="text-slate font-small ml-2 mr-2 text-left text-xl">
                    Discussion
                  </h1>
                </div>
              </TabsTrigger>
              <TabsTrigger value="notes">
                <div className="ml-1 mt-1 flex flex-row hover:text-muted-foreground transition-all duration-200 cursor-pointer">
                  <FileIcon width="25" height="25" />
                  <h1 className="text-slate font-small ml-1.5 mr-2 text-left text-xl">
                    Notes
                  </h1>
                </div>
              </TabsTrigger>
              <TabsTrigger value="resources">
                <div className="ml-2 mt-1 flex flex-row hover:text-muted-foreground transition-all duration-200 cursor-pointer">
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
            {/* <TabsContent value="questions">
              <QuestionsTab />
            </TabsContent>
            <TabsContent
              className="flex flex-1 flex-col gap-4 md:min-h-0 lg:flex-row"
              value="study"
            >
              <StudySetsTab />
            </TabsContent> */}
          </Tabs>
        </div>
      </CardHeader>
      {/* bottom right */}
      <Card className="bottom-section mt-3 flex h-full flex-col overflow-x-hidden overflow-y-scroll">
      </Card>
    </Card>
  );
}

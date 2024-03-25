import { DotsHorizontalIcon, FileIcon, VideoIcon } from "@feprep/ui";
import { Card, CardContent, CardHeader } from "@feprep/ui/card";

export function Right() {
  return (
    <Card className="flex h-full flex-col overflow-auto border-none">
      {/* top right */}
      <CardHeader className="top-section justify-left w-full flex-1 flex-row gap-2 rounded-xl border p-3">
        {/* Discussion */}
        <div className="mt-1 flex flex-row">
          <DotsHorizontalIcon width="25" height="25" />
          <h1 className="text-slate font-small ml-2 mr-2 text-left text-xl">
            Discussion
          </h1>
        </div>
        {/* Notes */}
        <div className="ml-1 mt-1 flex flex-row">
          <FileIcon width="25" height="25" />
          <h1 className="text-slate font-small ml-1.5 mr-2 text-left text-xl">
            Notes
          </h1>
        </div>
        {/* Resources */}
        <div className="ml-2 mt-1 flex flex-row">
          <VideoIcon width="25" height="25" />
          <h1 className="text-slate font-small ml-2 text-left text-xl">
            Resources
          </h1>
        </div>
      </CardHeader>
      {/* bottom right */}
      <Card className="bottom-section mt-3 flex h-full flex-col overflow-x-hidden overflow-y-scroll">
        <CardContent className="mt-4 w-[97%] flex-1 self-center rounded-xl border">
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            Profile Content
          </h1>
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            Comment
          </h1>
        </CardContent>
        <CardContent className="mt-4 w-[97%] flex-1 self-center rounded-xl border">
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            Profile Content 2
          </h1>
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            AYAYAYA AYAYAAYAY
          </h1>
        </CardContent>
        <CardContent className="mt-4 w-[97%] flex-1 self-center rounded-xl border">
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            comment
          </h1>
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            padding
          </h1>
        </CardContent>
        <CardContent className="mt-4 w-[97%] flex-1 self-center rounded-xl border">
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            comment
          </h1>
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            padding
          </h1>
        </CardContent>
        <CardContent className="mt-4 w-[97%] flex-1 self-center rounded-xl border">
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            comment
          </h1>
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            padding
          </h1>
        </CardContent>
        <CardContent className="mt-4 w-[97%] flex-1 self-center rounded-xl border">
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            comment
          </h1>
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            padding
          </h1>
        </CardContent>
        <CardContent className="mt-4 w-[97%] flex-1 self-center rounded-xl border">
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            comment
          </h1>
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            padding
          </h1>
        </CardContent>
        <CardContent className="mt-4 w-[97%] flex-1 self-center rounded-xl border">
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            comment
          </h1>
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            padding
          </h1>
        </CardContent>
      </Card>
    </Card>
  );
}

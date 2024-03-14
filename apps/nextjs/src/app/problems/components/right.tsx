import { DotsHorizontalIcon, FileIcon, VideoIcon } from "@feprep/ui";
import {
  Card,
  CardHeader,
} from "@feprep/ui/card";

export function Right() {
  return (
    <Card className="flex h-full flex-col border-none">
      {/* top right */}
      <CardHeader className="top-section justify-left flex w-full flex-row gap-2 rounded-xl border p-3">
        {/* Discussion */}
        <div className="flex flex-row mt-1">
          <DotsHorizontalIcon width="25" height="25" />
          <h1 className="ml-2 text-slate font-small mr-2 text-left text-xl">
            Discussion
          </h1>
        </div>
        {/* Notes */}
        <div className="ml-1 flex flex-row mt-1">
          <FileIcon width="25" height="25" />
          <h1 className="ml-1.5 text-slate font-small mr-2 text-left text-xl">
            Notes
          </h1>
        </div>
        {/* Resources */}
        <div className="ml-2 flex flex-row mt-1">
          <VideoIcon width="25" height="25" />
          <h1 className="ml-2 text-slate font-small text-left text-xl">Resources</h1>
        </div>
      </CardHeader>
      {/* bottom right */}
      <Card className="flex h-full flex-col overflow-scroll">
        <div className="bottom-section mt-4 w-full flex-1 rounded-xl border">
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            comment
          </h1>
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            padding
          </h1>
        </div>
        <div className="bottom-section mt-4 w-full flex-1 rounded-xl border">
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            comment 2
          </h1>
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            padding
          </h1>
        </div>
        <div className="bottom-section mt-4 w-full flex-1 rounded-xl border">
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            comment 3
          </h1>
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            padding
          </h1>
        </div>
        <div className="bottom-section mt-4 w-full flex-1 rounded-xl border">
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            comment 4
          </h1>
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            padding
          </h1>
        </div>
        <div className="bottom-section mt-4 w-full flex-1 rounded-xl border">
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            comment 5
          </h1>
          <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
            padding
          </h1>
        </div>
      </Card>
    </Card>
  );
}

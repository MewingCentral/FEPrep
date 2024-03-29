import { DotsHorizontalIcon, FileIcon, VideoIcon } from "@feprep/ui";

export function Right() {
  return (
    <div className="flex h-full flex-col rounded-xl">
      {/* top right */}
      <div className="top-section justify-left flex w-full flex-row gap-2 rounded-xl border p-4">
        <DotsHorizontalIcon width="25" height="25" />
        <h1 className="text-slate font-small mr-2 text-left text-xl">
          Discussion
        </h1>
        <FileIcon width="25" height="25" />
        <h1 className="text-slate font-small mr-2 text-left text-xl">Notes</h1>
        <VideoIcon width="25" height="25" />
        <h1 className="text-slate font-small text-left text-xl">Resources</h1>
      </div>
      {/* bottom right */}
      <div className="bottom-section mt-4 w-full flex-1 rounded-xl border">
        <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
          comment
        </h1>
        <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
          padding
        </h1>
      </div>
    </div>
  );
}

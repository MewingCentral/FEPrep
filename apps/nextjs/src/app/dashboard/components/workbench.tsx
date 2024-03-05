import { DotsHorizontalIcon, FileIcon, VideoIcon } from "@feprep/ui";

export function Workbench() {
  return (
    <main>
      <div className="mt-8 grid grid-cols-2 gap-4">
        {/* left panel */}
        <div className="left-section rounded-xl border">
          <h1> left side </h1>
        </div>
        {/* right panel */}
        <div className="right-section flex flex-col">
          {/* top right */}
          <div className="top-right-section justify-left flex w-full grow flex-row gap-2 rounded-xl border p-4">
            <DotsHorizontalIcon width="25" height="25" />
            <h1 className="text-slate font-small mr-2 text-left text-xl">
              Discussion
            </h1>
            <FileIcon width="25" height="25" />
            <h1 className="text-slate font-small mr-2 text-left text-xl">
              Notes
            </h1>
            <VideoIcon width="25" height="25" />
            <h1 className="text-slate font-small text-left text-xl">
              Resources
            </h1>
          </div>
          {/* bottom right */}
          <div className="bottom-right-section mt-5 w-full rounded-xl border">
            <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
              comment
            </h1>
            <h1 className="text-slate font-small px-4 py-2 text-left text-xl">
              padding
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}

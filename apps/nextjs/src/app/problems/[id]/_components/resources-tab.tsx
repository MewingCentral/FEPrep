import type { RouterOutputs } from "@feprep/api";

export function ResourcesTab({
  question,
}: {
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <iframe
        className="aspect-video"
        src="https://www.youtube.com/embed/zxwWpCwVExQ"
        title="Ultimate Foundation Exam Review"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
      {question.id}
    </div>
  );
}

// export function ResourcesTab() {
//   return (
//     <div className="flex flex-col gap-2">
//       <iframe
//         className="aspect-video"
//         src="https://www.youtube.com/embed/zxwWpCwVExQ"
//         title="Ultimate Foundation Exam Review"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         referrerPolicy="strict-origin-when-cross-origin"
//       ></iframe>
//     </div>
//   );
// }

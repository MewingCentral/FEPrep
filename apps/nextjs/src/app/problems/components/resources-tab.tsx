// "use client";
import Link from "next/link";

import { Card, CardContent } from "@feprep/ui/card";

// import { Label } from "@feprep/ui/label"
// import { Textarea } from "@feprep/ui/textarea"
// import { AvatarIcon } from "@feprep/ui";
// import { Button } from "@feprep/ui/button";

export function ResourcesTab() {
  return (
    <div className="flex flex-col gap-2">
      <iframe
        className="aspect-video"
        src="https://www.youtube.com/embed/zxwWpCwVExQ"
        title="Ultimate Foundation Exam Review"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
}

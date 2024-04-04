// "use client";
import { Card, CardContent } from "@feprep/ui/card";

// import { Label } from "@feprep/ui/label"
// import { Textarea } from "@feprep/ui/textarea"
// import { AvatarIcon } from "@feprep/ui";
// import { Button } from "@feprep/ui/button";

export function ResourcesTab() {
  return (
    <Card className="h-full flex-col">
      {/* public comments */}
      <CardContent className="space-y-2 p-4">
        <ResourcesLink link="http://google.com" />
        <ResourcesLink link="https://www.altcademy.com/blog/how-to-make-text-a-link-in-reactjs/" />
      </CardContent>
    </Card>
  );
}

function ResourcesLink({ link }: { link: string }) {
  return (
    <Card className="p-2">
      <a className="p-3" href={link} target="_blank" rel="noopener noreferrer">
        {link}
      </a>
    </Card>
  );
}

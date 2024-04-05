"use client";

import { AvatarIcon } from "@feprep/ui";
import { Button } from "@feprep/ui/button";
import { Textarea } from "@feprep/ui/textarea";

export function DiscussionTab() {
  return (
    <>
      <div className="mb-4">
        <Textarea className="mb-2" placeholder="Leave a comment!" />
        <Button>Submit</Button>
      </div>
      <div className="flex flex-col gap-2">
        <CommentCard
          name="pedro"
          content="hewwo I am not a rat I am a cat :3 haha :3 "
        />
        <CommentCard
          name="TKAM12059"
          content="The War of 1812 was fought by the United States and its allies against the United Kingdom and its allies in North America. It began when the United States declared war on Britain on 18 June 1812. Although peace terms were agreed upon in the December 1814 Treaty of Ghent, the war did not officially end until the peace treaty was ratified by the United States Congress on 17 February 1815."
        />
      </div>
    </>
  );
}

function CommentCard({ name, content }: { name: string; content: string }) {
  return (
    <div className="rounded-md border p-2">
      <div className="flex items-center p-2 font-bold">
        <AvatarIcon className="mr-2" width="25" height="25" />
        {name}
      </div>
      <p className="whitespace-normal p-2">{content}</p>
    </div>
  );
}

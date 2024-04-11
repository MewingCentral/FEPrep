"use client";

import { use } from "react";
import Link from "next/link";

import type { RouterOutputs } from "@feprep/api";

import { api } from "~/trpc/react";

export function ResourcesList({
  promise,
  question,
}: {
  promise: Promise<RouterOutputs["resources"]["allByQuestionId"]>;
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  const initialResources = use(promise);
  const resources = api.resources.allByQuestionId.useQuery(question.id, {
    initialData: initialResources,
  });

  const videos = resources.data?.filter((resource) => resource.isVideo) ?? [];
  const links = resources.data?.filter((resource) => !resource.isVideo) ?? [];

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Videos</h1>
        {videos.length === 0 ? (
          <p className="text-muted-foreground">
            Looks like there are no videos for this question yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {videos.map((resource) => (
              <iframe
                className="aspect-video w-full"
                // links must be embed links
                src={resource.link}
                title="Ultimate Foundation Exam Review"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                key={resource.id}
                allowFullScreen
              ></iframe>
            ))}
          </div>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-semibold">Links</h1>
        {links.length === 0 ? (
          <p className="text-muted-foreground">
            Looks like there are no links for this question yet.
          </p>
        ) : (
          <ul>
            {links.map((resource) => (
              <div key={resource.id} className="flex justify-start ">
                <Link
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  {resource.title}
                </Link>
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

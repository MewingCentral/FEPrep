"use client";

import { api } from "~/trpc/react";

export function HelloClient() {
  const { data, isLoading, isError } = api.hello.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return <div className="text-red-800">{data}</div>;
}

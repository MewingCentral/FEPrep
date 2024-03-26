import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@feprep/ui/card";

// database calls for pdf/markdown

export function Left({ _id }: { _id: string }) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        {/* This will need to be dynamic based on question */}
        <CardTitle>Section A: Basic Data Structures | Spring 2024</CardTitle>
        <CardDescription>10 Points</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-full bg-gray-600">
          {/* Just a placeholder background for visibility */}
          {/* Need the Markdown here */}
        </div>
      </CardContent>
      <CardFooter>{/* Need to add something here */}</CardFooter>
    </Card>
  );
}

import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@feprep/ui/card"

export function Left() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Section A: Basic Data Structures</CardTitle>
        <CardDescription>10 Points</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-full bg-gray-600"> {/* Just a placeholder background for visibility */}
          {/* Need the Markdown here */}
        </div>
      </CardContent>
      <CardFooter>
        {/* Need to add something here */}
      </CardFooter>
    </Card>
  );
}
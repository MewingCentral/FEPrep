"use client";

import { Excalidraw } from "@excalidraw/excalidraw";

const ExcalidrawWrapper: React.FC = () => {
  return (
    <div className="h-full w-full">
      <Excalidraw />
    </div>
  );
};

export default ExcalidrawWrapper;

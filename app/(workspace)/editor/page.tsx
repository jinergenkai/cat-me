'use client';

import { useState } from "react";
import { Button } from "components/ui/button";
import { cn } from "lib/utils";
import { Type } from 'lucide-react';
import { Icons } from "@/components/icons";
import { ChooseImageDialog } from "./dialog";
import FabricCanvas from "./useFabric";
import { FabricJSCanvas } from "fabricjs-react";
import { useToast } from "@/hooks/use-toast";

export default function MemeEditor() {
  const { toast } = useToast();

  const onFeatureUnderDevelopment = () => {
    console.log("Feature under development");
    toast({
      // className: cn('fixed right-0 top-16 z-[10000] flex  md:max-w-[420px]'),
      description: "Tính năng đang phát triển",
    });
  }

  // List of tools
  const { onReady, onAddCircle, onAddRectangle, addText, toggleDraw, clear,
    undo, redo, toggleSize, removeSelectedObject, setCropImage, color,
    setColor, exportSVG, fromSvg, cropImage, enablePanning, editor } = FabricCanvas();
  const tools = [
    { name: "Gắn chữ", icon: Icons.type, func: addText },
    { name: "Gắn nhãn", icon: Icons.sticker, func: onAddCircle },
    // { name: "Add Filter", icon: null },
    { name: "Cắt", icon: Icons.cut, func: onFeatureUnderDevelopment },
    // { name: "Rotate", icon: "↩️" },
    { name: "Chỉnh khung", icon: Icons.crop, func: onFeatureUnderDevelopment },
    { name: "Xoay", icon: Icons.rotate, onFeatureUnderDevelopment },
    { name: "Thêm lớp", icon: Icons.layer, onFeatureUnderDevelopment },
    { name: "lia vùng", icon: Icons.layer, func: () => enablePanning(editor?.canvas) },
    // Add more tools as needed
  ];


  return (
    <div>
      {/* Main Canvas */}
      <main className="h-[50%] bg-gray-50 p-4">
        <ChooseImageDialog />
        <FabricJSCanvas className="h-[50%] w-full" onReady={onReady} />
        {/* <div className="h-[1000px]"></div> */}
      </main>


      {/* Fixed Toolbar at the Bottom */}
      <div className="fixed inset-x-0 bottom-0 m-4 overflow-x-auto rounded-full bg-white p-2 dark:bg-black">
        <div className="flex">
          {tools.map((tool, index) => (
            <Button key={index} variant="ghost"
              className="flex items-center justify-center"
              onClick={tool?.func}
            >
              <div>
                {tool.icon ? <tool.icon /> : null}
              </div>
              <span className="ml-2 text-sm">{tool.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

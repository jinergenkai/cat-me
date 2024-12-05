'use client';

import { useState } from "react";
import { Button } from "components/ui/button";
import { cn } from "lib/utils";
import { Type } from 'lucide-react';
import { Icons } from "@/components/icons";
import { ChooseImageDialog } from "./dialog";
import FabricCanvas from "./useFabric";
import { FabricJSCanvas } from "./fabric";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { InputEventAttacher } from "./fabric/custom/import-pdf";
import { Input } from "@/components/ui/input";

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
    {
      name: "Thêm ảnh", icon: Icons.image,
      comp: () => (<>
        <div className="relative inline-block">
          <Button className="btn rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600 focus:outline-none">
            Thêm ảnh
          </Button>
          <input key={0} id="picture" type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 cursor-pointer opacity-0" />
        </div>
      </>
      )
    },

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    var url = URL.createObjectURL(event.target.files[0]);
    editor?.importImage(url, 0.2);

    //remove file from input
    event.target.value = null;
  };

  const router = useRouter();


  return (
    <div>
      {/* Main Canvas */}
      <main className="h-[50%] bg-gray-50 p-4">

        {/* <ChooseImageDialog /> */}
        {/* <Button onClick={() => router.push("/editor/test")}>Toggle Draw</Button> */}
        <FabricJSCanvas className="h-[50%] w-full" onReady={onReady} />
        {/* <div className="h-[1000px]"></div> */}
      </main>




      {/* Fixed Toolbar at the Bottom */}
      <div className="fixed inset-x-0 bottom-0 m-4 overflow-x-auto rounded-full bg-white p-2 dark:bg-black">
        <div className="flex">
          {tools.map((tool, index) => {
            if (tool.comp) return tool.comp();
            return (
              <Button key={index} variant="ghost"
                className="flex items-center justify-center"
                onClick={tool?.func}
              >
                <div>
                  {tool.icon ? <tool.icon /> : null}
                </div>
                <span className="ml-2 text-sm">{tool.name}</span>
              </Button>
            );
          })
          }
        </div>
      </div>
    </div>
  );
}

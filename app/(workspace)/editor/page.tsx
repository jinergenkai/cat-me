"use-client";

import { useState } from "react";
import { Button } from "components/ui/button";
import { cn } from "lib/utils";
import { Type } from 'lucide-react';
import { Icons } from "@/components/icons";

export default function MemeEditor() {
  // List of tools
  const tools = [
    { name: "Gắn chữ", icon: Icons.type },
    { name: "Gắn nhãn", icon: Icons.sticker },
    // { name: "Add Filter", icon: null },
    { name: "Cắt", icon: Icons.cut },
    // { name: "Rotate", icon: "↩️" },
    { name: "Chỉnh khung", icon: Icons.crop },
    { name: "Xoay", icon: Icons.rotate },
    { name: "Thêm lớp", icon: Icons.layer },
    // Add more tools as needed
  ];

  return (
    <div className="relative flex h-[90vh] flex-col">
      {/* Main Canvas */}
      <main className="flex flex-1 items-center justify-center bg-gray-50 p-4">
        {/* Placeholder for the image canvas */}
        <Button variant="secondary" className="m-auto rounded text-gray-400">
          + Chọn ảnh hoặc kéo thả ảnh vào đây
        </Button>
      </main>

      {/* Fixed Toolbar at the Bottom */}
      <div className="fixed inset-x-0 bottom-0 m-4 flex items-center overflow-x-auto rounded-full bg-white p-2">
        <div className="flex space-x-4">
          {tools.map((tool, index) => (
            <Button
              key={index}
              variant="ghost"
              className="flex items-center justify-center"
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

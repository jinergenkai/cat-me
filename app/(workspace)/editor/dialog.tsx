'use client';
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast";

export function ChooseImageDialog() {
  const {toast} = useToast();

  const handleImportFile = (event): void => {
    toast({ title: "Chức năng đang phát triển!" });
  }

  const handleSelectTemplate = (event): void => {
    toast({ title: "Chức năng đang phát triển" });
  }

  const handleCreateNewProject = (event): void => {
    toast({ title: "Chức năng đang phát triển" });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="m-auto rounded text-gray-400">
          + Chọn hoặc kéo ảnh vào đây
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[75%] rounded sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo</DialogTitle>
          <DialogDescription>
         
          </DialogDescription>
        </DialogHeader>
          <div className="grid flex-1 gap-2">
            <Button variant={"outline"} onClick={handleCreateNewProject}>Tạo mới</Button>
            <Button variant={"outline"} onClick={handleImportFile}>Chọn ảnh từ máy</Button>
            <Button variant={"outline"} onClick={handleSelectTemplate}>Chọn mẫu từ thư viện</Button>
          </div>
      </DialogContent>
    </Dialog>
  )
}

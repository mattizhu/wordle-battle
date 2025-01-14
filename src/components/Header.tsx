"use client";

import {CircleHelp, Menu, Share} from "lucide-react";

import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/Dialog";

export default function Header() {
  return (
    <header className="py-2.5 px-4 max-h-12 border-b border-neutral-800">
      <div className="flex justify-between items-center font-bold">
        <div className="w-64">
          <p><Menu /></p>
        </div>
        <p className="text-xl">WORDLE<span className="text-sm font-normal text-neutral-500">.dev</span></p>
        <div className="flex flex-row items-center justify-end space-x-2 w-64">
          <Dialog>
            <DialogTrigger>
              <CircleHelp />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Wordle.dev</DialogTitle>
              <p>Help Content</p>
            </DialogContent>
          </Dialog>
          <p><Share /></p>
        </div>
      </div>
    </header>
  );
};

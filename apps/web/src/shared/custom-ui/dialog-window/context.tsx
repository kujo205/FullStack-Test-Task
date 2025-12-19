import { createContext, ReactNode, useContext, useState } from "react";
import { DialogRenderer } from "./dialog-renderer.tsx";
import { DialogOptions } from "./types.ts";

interface DialogContextType {
  open: (options: DialogOptions) => void;
  close: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<DialogOptions | null>(null);

  const open = (opts: DialogOptions) => {
    setOptions(opts);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setOptions(null);
  };

  return (
    <DialogContext.Provider value={{ open, close }}>
      {children}
      <DialogRenderer isOpen={isOpen} options={options} onClose={close} />
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("useDialog must be used inside DialogProvider");
  }
  return ctx;
}

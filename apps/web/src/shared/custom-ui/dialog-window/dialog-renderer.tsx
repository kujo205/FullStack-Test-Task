import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { type DialogOptions } from "./types.ts";

interface DialogRendererProps {
  isOpen: boolean;
  options: DialogOptions | null;
  onClose: () => void;
}

const sizeMap = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
};

export function DialogRenderer({ isOpen, options, onClose }: DialogRendererProps) {
  if (!options) {
    return null;
  }

  const { title, description, content, size = "md", dismissible = true } = options;

  return (
    <Dialog open={isOpen} onOpenChange={dismissible ? onClose : undefined}>
      <DialogContent className={sizeMap[size]}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        {content}
      </DialogContent>
    </Dialog>
  );
}

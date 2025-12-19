import { ReactNode } from "react";

export interface DialogOptions {
  title?: string;
  description?: string;
  content: ReactNode;
  size?: "sm" | "md" | "lg";
  dismissible?: boolean;
}

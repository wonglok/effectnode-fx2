import { useEffect } from "react";

export function Runtime({ io }) {
  useEffect(() => {
    io.out(0, {
      name: "config",
      countX: 1024,
      countY: 1024,
    });
  }, [io]);

  return null;
}
export function ToolBox() {}

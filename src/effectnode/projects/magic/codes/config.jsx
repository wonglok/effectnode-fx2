import { useEffect } from "react";

export function Runtime({ io }) {
  useEffect(() => {
    io.out(0, {
      name: "config",
      countX: 100,
      countY: 100,
      countZ: 100,

      resX: 1000,
      resY: 1000,
    });
  }, [io]);

  return null;
}

export function ToolBox() {}

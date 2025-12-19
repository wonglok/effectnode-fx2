import { useEffect } from "react";

export function Runtime({ io }) {
  useEffect(() => {
    let unit = 64;
    io.out(0, {
      name: "config",
      countX: unit,
      countY: unit,
      countZ: unit,

      resX: Math.pow(Math.pow(unit, 3), 0.5),
      resY: Math.pow(Math.pow(unit, 3), 0.5),
    });
  }, [io]);

  return null;
}

export function ToolBox() {
  //
}

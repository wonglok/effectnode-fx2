import { createContext, useEffect, useState } from "react";
import { EditorRoot } from "./EditorRoot";
export const CoreContext = createContext(null);

export function EffectNodeStudio({ title, children }) {
  const [core, setCore] = useState(null);

  if (!title) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Needs Title
      </div>
    );
  }
  return (
    <>
      <CoreContext.Provider value={core}>
        {process.env.NODE_ENV === "development" ? (
          <div className=" absolute top-0 left-0 w-full h-full">
            {
              <EditorRoot
                onCoreReady={({ core }) => {
                  setCore(core);
                }}
                preview={<>{children}</>}
                title={title}
              ></EditorRoot>
            }
          </div>
        ) : (
          <>{children}</>
        )}
      </CoreContext.Provider>
    </>
  );
}

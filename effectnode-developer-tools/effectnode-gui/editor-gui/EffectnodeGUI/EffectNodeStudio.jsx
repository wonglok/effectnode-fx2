import { createContext, useEffect, useState } from "react";
import { EditorRoot } from "./EditorRoot";
import { TitleTunnelIn } from "./EditorApp/EditorApp";
export const CoreContext = createContext(null);

export function EffectNodeStudio({ projectTitle = "", children }) {
  const [core, setCore] = useState(null);

  if (!projectTitle) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Needs Title
      </div>
    );
  }
  return (
    <>
      <TitleTunnelIn>
        {/* {titles &&
          titles.map((r) => {
            return (
              <div key={r.name + "title"} className="mx-2">
                {r.name}
              </div>
            );
          })} */}
      </TitleTunnelIn>
      <CoreContext.Provider value={core}>
        {process.env.NODE_ENV === "development" ? (
          <div className=" absolute top-0 left-0 w-full h-full">
            {
              <EditorRoot
                onCoreReady={({ core }) => {
                  setCore(core);
                }}
                preview={<>{children}</>}
                title={projectTitle}
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

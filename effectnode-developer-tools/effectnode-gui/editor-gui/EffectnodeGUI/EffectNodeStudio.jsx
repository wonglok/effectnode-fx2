import { createContext, useState } from "react";
import { EditorRoot } from "./EditorRoot";
import { TitleTunnelIn } from "./EditorApp/EditorApp";
import { usePopStore } from "effectnode-developer-tools/effectnode-runtime/tools/usePopStore";

export const CoreContext = createContext(null);

export function EffectNodeStudio({ projectName = "", children }) {
  let [title, setTitle] = useState(projectName);
  let projects = usePopStore((r) => r.projects);
  console.log(projects);

  const [core, setCore] = useState(null);

  if (process.env.NODE_ENV !== "development") {
    return <>Please use a computer to edit the files</>;
  }

  if (!projectName) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Please Specfiy Project Title
      </div>
    );
  }
  return (
    <>
      <TitleTunnelIn>
        {/* <span className="mx-2">{`|`}</span>
        <span className="mr-2">{`Other Projects 🫱🏻`}</span> */}

        {/* {projects &&
          projects.map((r, i) => {
            return (
              <div key={r._id + "title"} className="">
                <span
                  onClick={() => {
                    setTitle(r.title);
                  }}
                  className="underline bg-gray-100 p-1 px-2 mr-1"
                >
                  {r.projectName}
                </span>
              </div>
            );
          })} */}
      </TitleTunnelIn>
      {/*  */}
      <div className="  w-full h-full">
        {
          <CoreContext.Provider value={core}>
            <EditorRoot
              key={projectName + "editor-root"}
              onCoreReady={({ core }) => {
                setCore(core);
              }}
              preview={<>{children}</>}
              title={projectName}
            ></EditorRoot>
          </CoreContext.Provider>
        }
      </div>
    </>
  );
}

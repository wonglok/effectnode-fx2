import { useEffect, useState } from "react";

export function EditorShell({ title, children }) {
  let [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!title) {
      setEditor(<div>Missing title</div>);
      return;
    }
    if (process.env.NODE_ENV === "development") {
      import("./EditorRoot").then((module) => {
        let { EditorRoot } = module;

        setEditor(
          <div className=" absolute top-0 left-0 w-full h-full">
            {
              <EditorRoot
                preview={
                  <>
                    {/*  */}

                    {children}
                  </>
                }
                title={title}
              ></EditorRoot>
            }
          </div>
        );
      });
    }
  }, [title, children]);

  return (
    <>{process.env.NODE_ENV === "development" ? editor : <>{children}</>}</>
  );
}
// import { EffectNode } from "effectnode-developer-tools/effectnode-runtime/EffectNode";
// import { useEffect, useState } from "react";
import { Output2D } from "../../../EditorRoot";

export function Previewer2({ win, useStore }) {
  // let spaceID = useStore((r) => r.spaceID);
  // let getState = useCallback(() => {
  //   return useStore.getState().editorAPI.exportBackup();
  // }, [useStore]);

  // let [state, setState] = useState(false);

  // useEffect(() => {
  //   return useStore.subscribe((now, before) => {
  //     if (now.settings !== before.settings) {
  //       //
  //       setState(getState());
  //       //
  //     }
  //   });
  // }, [useStore, getState]);

  //

  // let [ef, setEf] = useState(null);
  // useEffect(() => {
  //   setEf(
  //     <EffectNode
  //       key={spaceID}
  //       useEditorStore={useStore}
  //       projectName={spaceID}
  //     ></EffectNode>
  //   );
  // }, [spaceID, useStore]);
  return (
    <>
      {/* {ef} */}

      <Output2D></Output2D>

      {/* {spaceID && (
        <AppRunner
          win={win}
          state={state}
          useStore={useStore}
          getState={getState}
          spaceID={spaceID}
        ></AppRunner>
      )} */}
      {/* {spaceID} */}

      {/*  */}
    </>
  );
}

//

//
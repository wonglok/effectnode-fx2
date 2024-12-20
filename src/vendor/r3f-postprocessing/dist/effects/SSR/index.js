import { jsx } from "react/jsx-runtime";
import { forwardRef, useMemo } from "react";
import { SSREffect } from "./screen-space-reflections.js";
// import { selectionContext } from "../../Selection.js";
// import { useThree } from "@react-three/fiber";
const SSR = forwardRef(function SSR2(
  { scene, camera, ENABLE_BLUR = true, USE_MRT = true, ...props },
  ref
) {
  // const { invalidate } = useThree();
  const effect = useMemo(
    () => new SSREffect(scene, camera, { ENABLE_BLUR, USE_MRT, ...props }),
    [scene, camera, ENABLE_BLUR, USE_MRT, props]
  );
  // const api = useContext(selectionContext);
  // useEffect(() => {
  //   var _a;
  //   if (api && api.enabled) {
  //     if ((_a = api.selected) == null ? void 0 : _a.length) {
  //       effect.selection.set(api.selected);
  //       invalidate();
  //       return () => {
  //         effect.selection.clear();
  //         invalidate();
  //       };
  //     }
  //   }
  // }, [api]);
  return /* @__PURE__ */ jsx("primitive", { ref, object: effect, ...props });
});
export { SSR };
//# sourceMappingURL=index.js.map

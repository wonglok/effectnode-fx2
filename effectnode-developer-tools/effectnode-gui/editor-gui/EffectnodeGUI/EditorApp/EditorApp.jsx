import { BeginBar } from "../BeginBar/BeginBar";
import { BeginMenu } from "../BeginBar/BeginMenu";
import { ThankYouList } from "../BeginBar/ThankYouList";
import { AppWindows } from "../AppWindows/AppWindows";
import Link from "next/link";
import moment from "moment";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDeveloper } from "effectnode-developer-tools/effectnode-gui/store/useDeveloper";
import tunnel from "tunnel-rat";

export const TitleTunnel = tunnel();

export const TitleTunnelIn = TitleTunnel.In;

export function EditorApp({ useStore }) {
  let router = useRouter();
  let spaceID = useStore((r) => r.spaceID);

  // let [dateString, setDate] = useState(
  //   moment().format("MMMM Do YYYY, h:mm:ss a")
  // );
  // useEffect(() => {
  //   let tt = setInterval(() => {
  //     setDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
  //   }, 1000);

  //   return () => {
  //     clearInterval(tt);
  //   };
  // }, []);

  let rename = () => {
    let newTitle = window.prompt("Rename Workspace title", spaceID);
    if (newTitle) {
      useDeveloper
        .getState()
        .rename({
          oldTitle: spaceID,
          title: newTitle,
        })
        .catch((r) => {
          alert("name taken");
          return Promise.reject("name taken");
        })
        .then(() => {
          location.assign(`/dev/projects/${newTitle}`);
        });
    }
  };

  let clone = () => {
    let newTitle = window.prompt("Clone Workspace new name", spaceID);
    if (newTitle) {
      useDeveloper
        .getState()
        .clone({
          oldTitle: spaceID,
          title: `${newTitle}`,
        })
        .catch((r) => {
          alert("name taken");
          return Promise.reject("name taken");
        })
        .then(() => {
          location.assign(`/dev/projects/${newTitle}`);
        });
    }
  };

  return (
    <div className="w-full h-full">
      <div
        className="w-full"
        style={{
          height: `1.85rem`,

          backgroundImage: `
          linear-gradient(
                90deg,
                #cccccc,
                #cccccc,
                #ffffff,
                #cccccc,
                #cccccc
         )       
                `,
        }}
      >
        <div className="w-full h-full flex items-center justify-between px-2 text-sm">
          <div className="flex">
            <Link href={`/`} className="underline text-black">
              EffectNode FX
            </Link>
            <span className="mx-2">|</span>

            <span className=" cursor-pointer inline-block">{spaceID}</span>

            <TitleTunnel.Out></TitleTunnel.Out>
            {/* 
            
            <span className="mx-2">|</span>

            <span
              className="text-sm underline text-blue-500 cursor-pointer inline-block"
              onClick={rename}
            >
              {`Rename`}
            </span>

            <span className="mx-2">|</span>

            <span
              className="text-sm underline text-blue-500 cursor-pointer inline-block"
              onClick={clone}
            >
              {`Clone`}
            </span> 
            
            */}
          </div>
          <div className=""></div>
          <div className="text-black">
            {/* <span
              onClick={() => {
                //
                let confirm = window.prompt(
                  "To Remove workspace please type yes",
                  "no"
                );
                if (confirm === "yes") {
                  useDeveloper
                    .getState()
                    .recycle({ title: spaceID })
                    .then(() => {
                      router.push(`/dev`);
                    })
                    .catch(() => {
                      router.push(`/dev`);
                    });
                }
                //
              }}
              className=" mr-2 underline inline-block text-xs text-red-500 hover:text-red-500 hover:underline px-3 py-1 hover:bg-white rounded-2xl cursor-pointer"
            >
              Remove Workspace
            </span> */}
          </div>
        </div>
      </div>
      {/*  */}
      <div
        className="w-full"
        style={{
          height: `calc(100% - 1.85rem - 1.85rem * 0.0 - 2.75rem)`,
        }}
      >
        <div className="w-full h-full relative">
          <AppWindows useStore={useStore}></AppWindows>
          <BeginMenu useStore={useStore}></BeginMenu>
          <ThankYouList useStore={useStore}></ThankYouList>
        </div>
      </div>
      <div
        className="w-full from-gray-100 to-gray-500 bg-gradient-to-l "
        style={{
          height: `2.75rem`,
          backgroundImage: `
    linear-gradient(
          90deg,
          #747474,
          #f3f3f3,
          #747474
   )       
          `,
          position: "relative",
        }}
      >
        <div
          className="w-full h-full absolute top-0 left-0"
          style={{ zIndex: `9999999999px` }}
        >
          <BeginBar useStore={useStore}></BeginBar>
        </div>
      </div>
    </div>
  );
}

//

// Edge Advantage

//

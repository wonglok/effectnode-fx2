'use client'
import Link from "next/link";

export default function Index() {
  return (
    <>
      {/* <div>
        <div className="text-2xl p-2">Room</div>
        <div className="p-2">
          <Link className=" px-4 py-1 bg-gray-200 inline-block mx-2" href="/room">
            Preview
          </Link>
          <Link className=" px-4 py-1 bg-gray-200 inline-block mx-2" href="/editor/room">
            Editor
          </Link>
        </div>
      </div> */}
      <div>
        <div className="text-2xl p-2">Room</div>
        <div className="p-2">
          <Link className=" px-4 py-1 bg-gray-200 inline-block mx-2" href="/room">
            Preview
          </Link>
          <Link className=" px-4 py-1 bg-gray-200 inline-block mx-2" href="/editor/room">
            Editor
          </Link>
        </div>
      </div>
    </>
  );
}

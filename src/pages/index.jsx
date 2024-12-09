import Link from "next/link";

export default function Index() {
  return (
    <>
      <div className="text-2xl p-2">Index</div>
      <div className="p-2">
        <Link className=" px-4 py-1 bg-gray-200 inline-block mx-2" href="/room">
          Room
        </Link>
        <Link className=" px-4 py-1 bg-gray-200 inline-block mx-2" href="/ball">
          Ball
        </Link>
        <Link className=" px-4 py-1 bg-gray-200 inline-block mx-2" href="/ball">
          Hair
        </Link>
      </div>
    </>
  );
}

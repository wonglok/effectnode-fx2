import Link from "next/link";

export default function Index() {
  return (
    <>
      <div>Index</div>
      <Link href="/room">Room</Link>
      <Link href="/station">Station</Link>
    </>
  );
}

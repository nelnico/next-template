import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <ul>
        <Link href="/people">People</Link>
      </ul>
    </main>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home Here</h1>

      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </>
  );
}

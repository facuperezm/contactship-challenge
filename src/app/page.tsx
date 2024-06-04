import AudioComponent from "@/components/audio-component";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="p-4">
        <h1 className="text-center mt-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Contact Ship AI
        </h1>
        <h2 className="p-4 text-center text-muted-foreground">
          Made with ❤️ by{" "}
          <Link
            className="hover:underline underline-offset-2"
            href="https://facuperezm.com"
          >
            Facundo
          </Link>
        </h2>
        <AudioComponent />
      </main>
    </>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function OshiseBanner() {
  return (
    <section className="max-w-5xl mx-auto px-4 pb-10">
      <Link href="/feature/oshise" className="block">
        <Image
          src="/banner-oshmise.png"
          alt="推し店連れてって！インフルエンサーの推し店をのぞき見"
          width={1500}
          height={600}
          className="w-full h-auto object-cover rounded-2xl"
          priority
        />
      </Link>
    </section>
  );
}

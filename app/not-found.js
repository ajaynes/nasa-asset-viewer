import Link from 'next/link';
import Image from "next/image";

export default function NotFound() {
  return (
    <main>
        <div className="mx-auto w-full max-w-7xl px-4 py-6 text-center">
            <div className="flex flex-col lg:flex-row items-center justify-center">
            <Image
                src="/404rocket.svg"
                alt="rocket icon"
                width={300}
                height={20}
                style={{ marginRight: 15 }}
                priority
                />

            </div>
            <h2 className='font-bold text-3xl lg:text-5xl'>Houston, we have a problem!</h2>
            <p className='mt-1.5 text-lg lg:text-xl'>The page you&apos;re looking for doesn&apos;t live here anymore :(. <Link href="/" className='underline'>Return to the homepage.</Link></p>
        </div>
    </main>
  );
}

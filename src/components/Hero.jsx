import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <header className="bg-secondary">
      <section
        className="container mx-auto flex flex-col-reverse md:flex-row items-center px-5 py-24"
        aria-labelledby="hero-heading"
      >
        {/* Text Content */}
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col items-center md:items-start text-center md:text-left">
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-tight"
          >
            Find Jobs in Bangladesh <br className="hidden lg:inline-block" />
            with <span className="text-primary">BD Jobs</span>
          </h1>

          <p className="mb-8 leading-relaxed md:w-[85%] text-muted-foreground">
            BD Jobs is your trusted platform for discovering verified job
            opportunities across Bangladesh. Whether you are a fresher or an
            experienced professional, find the right career move faster and
            smarter.
          </p>

          <nav
            className="flex gap-4"
            aria-label="Primary actions"
          >
            <Link href="/jobs">
              <Button variant="default">Browse Jobs</Button>
            </Link>

            <Link href="/about">
              <Button variant="outline">About BD Jobs</Button>
            </Link>
          </nav>
        </div>

        {/* Image */}
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <Image
            src="/hero.jpeg"
            alt="Job seekers searching and applying for jobs in Bangladesh"
            width={600}
            height={400}
            priority
            className="rounded-lg object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </section>
    </header>
  );
};

export default Hero;


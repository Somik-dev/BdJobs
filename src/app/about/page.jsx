import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About BD Jobs | Find Jobs in Bangladesh",
  description:
    "Learn about BD Jobs and our mission to connect job seekers in Bangladesh with trusted employers and career opportunities.",
};

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* About / Mission */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <header className="max-w-4xl mx-auto text-center">
          <Image
            src="/about.jpg"
            alt="BD Jobs helping job seekers find employment opportunities in Bangladesh"
            width={520}
            height={360}
            priority
            className="mx-auto mb-6 rounded-lg object-cover"
          />

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Our Mission at{" "}
            <span className="text-primary">BD Jobs</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
            At BD Jobs, our mission is to simplify the job search process in
            Bangladesh. We connect talented professionals with verified
            companies, helping job seekers build meaningful careers and
            employers find the right talent faster.
          </p>
        </header>
      </section>

      {/* Call to Action */}
      <section className="bg-secondary py-12 md:py-16 pt-10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to find your next job in Bangladesh?
          </h2>

          <p className="text-base md:text-lg mb-8 text-muted-foreground max-w-2xl">
            Join thousands of job seekers who trust BD Jobs to discover new
            career opportunities every day.
          </p>

          <nav aria-label="Primary action" className="text-center">
            <Link href="/jobs">
              <Button size="lg">Browse Jobs</Button>
            </Link>
          </nav>
        </div>
      </section>
    </main>
  );
};

export default About;


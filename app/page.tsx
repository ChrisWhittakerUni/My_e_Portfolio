import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsGrid } from "@/components/SkillsGrid";
import { Timeline } from "@/components/Timeline";
import { site } from "@/data/site";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  description: site.summary,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: site.location },
  sameAs: [site.socials.github.href, site.socials.linkedin.href],
};

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <Hero />
        <About />
        <SkillsGrid />
        <ProjectsSection />
        <Timeline />
        <Contact />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}

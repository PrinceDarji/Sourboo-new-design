import Navbar from '@/app/components/about/AboutNavbar';
import SiteFooter from '@/app/components/SiteFooter';

type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalPageTemplateProps = {
  title: string;
  sections: LegalSection[];
};

export default function LegalPageTemplate({ title, sections }: LegalPageTemplateProps) {
  return (
    <main className="sbx-legal">
      <Navbar />

      <section className="sbx-legal__inner" aria-labelledby="sbx-legal-title">
        <h1 id="sbx-legal-title" className="sbx-legal__title">
          {title}
        </h1>

        <div className="sbx-legal__sections">
          {sections.map((section) => (
            <article key={section.title} className="sbx-legal__article">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={`${section.title}-${index}`}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

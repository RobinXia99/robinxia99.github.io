import { useContentful } from "../../hooks/useContentful";
import SectionHeading from "../ui/SectionHeading";
import AnimatedReveal from "../ui/AnimatedReveal";
import "../../styles/contact.css";

const MESSAGE =
  "My inbox is always open — whether you have a question, a project idea, want to collaborate, or just want to say hi, feel free to reach out and I'll do my best to get back to you!";
const FALLBACK_EMAIL = "robin_99@live.se";

export default function ContactSection() {
  const { data } = useContentful("siteSettings");
  const email = data?.[0]?.fields?.email || FALLBACK_EMAIL;

  return (
    <section className="contact-section" id="contact-section">
      <AnimatedReveal>
        <SectionHeading number="04" title="Contact" />

        <div className="contact-inner">
          <h2 className="contact-heading">Get In Touch</h2>
          <p className="contact-message">{MESSAGE}</p>
          <a
            href={`mailto:${email}`}
            className="contact-cta"
            data-cursor="pointer"
          >
            Say Hello
          </a>
        </div>
      </AnimatedReveal>
    </section>
  );
}

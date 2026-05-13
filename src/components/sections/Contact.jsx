import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Reveal from '../ui/Reveal';
import { personalInfo } from '../../data/portfolioData';
import s from './Contact.module.css';

const SOCIALS = [
  { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, icon: '✉' },
  { label: 'LinkedIn', value: 'sazid-ali-932571159', href: personalInfo.linkedin, icon: 'in' },
  { label: 'GitHub', value: 'sazidrj', href: personalInfo.github, icon: 'gh' },
  { label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}`, icon: '☎' },
];

export default function Contact() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailto, '_blank');
    setSent(true);
  };

  return (
    <section className="section section-alt" id="contact">
      <div className="section-inner">
        <div className="section-label">Let's Connect</div>
        <h2 className="section-h2">Get In Touch</h2>

        <div ref={ref} className={s.grid}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
          >
            {sent ? (
              <div className={s.sent}>
                <div className={s.sentIcon}>✓</div>
                <div className={s.sentTitle}>Message sent!</div>
                <p className={s.sentSub}>Your email client opened. I'll get back to you soon.</p>
                <button className="btn-outline" onClick={() => setSent(false)}>Send another</button>
              </div>
            ) : (
              <form className={s.form} onSubmit={handleSubmit}>
                <div className={s.field}>
                  <label className={s.label}>
                    <span className={s.prompt}>&gt;</span> What's your name?
                  </label>
                  <input
                    className={s.input}
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className={s.field}>
                  <label className={s.label}>
                    <span className={s.prompt}>&gt;</span> Your email?
                  </label>
                  <input
                    className={s.input}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className={s.field}>
                  <label className={s.label}>
                    <span className={s.prompt}>&gt;</span> Your message
                  </label>
                  <textarea
                    className={s.textarea}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>

          {/* Right side */}
          <motion.div
            className={s.right}
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16,1,0.3,1] }}
          >
            <p className={s.intro}>
              Open to AI/ML engineering roles, consulting, and freelance web projects.
              Whether you have a product idea or want to talk shop — let's connect.
            </p>

            <div className={s.links}>
              {SOCIALS.map(l => (
                <a key={l.label} className={s.link} href={l.href} target="_blank" rel="noreferrer">
                  <div className={s.linkIcon}>{l.icon}</div>
                  <div className={s.linkInfo}>
                    <span className={s.linkLabel}>{l.label}</span>
                    <span className={s.linkValue}>{l.value}</span>
                  </div>
                  <span className={s.linkArrow}>↗</span>
                </a>
              ))}
            </div>

            <div className={s.bigText}>
              LET'S<br />
              BUILD<br />
              <span className={s.hl}>SOMETHING</span><br />
              GREAT.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

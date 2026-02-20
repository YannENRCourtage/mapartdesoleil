import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Send } from 'lucide-react';

// Endpoint Formspree
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrblwazb';

export const ContactSection = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '' // honeypot anti-spam
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.website || sending) return; // bot/double-clic

    try {
      setSending(true);
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || 'Nouveau message – mapartdesoleil.fr',
          message: form.message,
          _subject: form.subject || 'Nouveau message – mapartdesoleil.fr',
          source: 'mapartdesoleil.fr – ContactSection'
        })
      });

      if (!res.ok) throw new Error('Erreur lors de l’envoi.');
      toast({ title: 'Message envoyé !', description: 'Merci de nous avoir contactés. Nous reviendrons vers vous rapidement.' });
      setForm({ name: '', email: '', subject: '', message: '', website: '' });
    } catch (err) {
      toast({ title: 'Échec de l’envoi', description: err.message || 'Merci de réessayer dans un instant.', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact-section" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Contactez-nous</h2>
          <p className="mt-4 text-lg text-muted-foreground">Une question ? Un projet ? Nous sommes à votre écoute.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bloc infos */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Notre Bureau</h3>
                <p className="text-muted-foreground">7 rue Gutenberg, 33700 Mérignac</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <a href="mailto:contact@enr-courtage.fr" className="text-muted-foreground hover:text-primary">
                  contact@enr-courtage.fr
                </a>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg shadow-lg">
            {/* honeypot caché */}
            <input type="text" name="website" value={form.website} onChange={onChange} className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-2 gap-4">
              <Input name="name" placeholder="Votre nom" value={form.name} onChange={onChange} required />
              <Input name="email" type="email" placeholder="Votre email" value={form.email} onChange={onChange} required />
            </div>
            <Input name="subject" placeholder="Sujet" value={form.subject} onChange={onChange} required />
            <Textarea name="message" placeholder="Votre message" rows={5} value={form.message} onChange={onChange} required />

            <Button type="submit" className="w-full" disabled={sending}>
              <Send className="w-4 h-4 mr-2" /> {sending ? 'Envoi en cours…' : 'Envoyer le message'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
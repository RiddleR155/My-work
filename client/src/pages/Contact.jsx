import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Seo from '../components/common/Seo';
import Button from '../components/ui/Button';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '../components/ui/SocialIcons';
import { submitContactMessage } from '../services/contactService';
import { getErrorMessage } from '../services/api';

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      await submitContactMessage(formData);
      toast.success('Message sent! We will get back to you soon.');
      reset();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const inputClass =
    'w-full border border-charcoal-900/20 px-4 py-3 text-sm bg-cream-100 focus:outline-none focus:border-charcoal-900 transition-colors';

  return (
    <div className="bg-cream-100">
      <Seo
        title="Contact Us"
        description="Get in touch with Leathertique Impex for product inquiries, bulk orders, or customer support."
      />

      <section className="bg-charcoal-950 py-16 text-center">
        <p className="text-gold-400 uppercase tracking-[0.25em] text-xs mb-3">Get in Touch</p>
        <h1 className="font-display text-3xl md:text-4xl text-cream-100">Contact Leathertique Impex</h1>
      </section>

      <div className="container-max py-20 grid grid-cols-1 lg:grid-cols-5 gap-16">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-10"
        >
          <div>
            <h2 className="font-display text-2xl text-charcoal-900 mb-4">We'd Love to Hear From You</h2>
            <p className="text-charcoal-700/80 leading-relaxed">
              Whether you have a question about an order, want to discuss a bulk export
              inquiry, or simply want to know more about our craftsmanship — reach out and our
              team will respond promptly.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-leather-800 mt-1 shrink-0" />
              <div>
                <p className="font-medium text-charcoal-900">Business Location</p>
                <p className="text-sm text-charcoal-700/70">Sialkot Export Processing Zone, Punjab, Pakistan</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} className="text-leather-800 mt-1 shrink-0" />
              <div>
                <p className="font-medium text-charcoal-900">Phone</p>
                <p className="text-sm text-charcoal-700/70">+92 300 1234567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={20} className="text-leather-800 mt-1 shrink-0" />
              <div>
                <p className="font-medium text-charcoal-900">Email</p>
                <p className="text-sm text-charcoal-700/70">info@leathertiqueimpex.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={20} className="text-leather-800 mt-1 shrink-0" />
              <div>
                <p className="font-medium text-charcoal-900">Business Hours</p>
                <p className="text-sm text-charcoal-700/70">Monday – Saturday, 9:00 AM – 6:00 PM PKT</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-charcoal-900/20 flex items-center justify-center hover:border-gold-500 hover:text-gold-600 transition-colors">
              <FacebookIcon size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-charcoal-900/20 flex items-center justify-center hover:border-gold-500 hover:text-gold-600 transition-colors">
              <InstagramIcon size={16} />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-charcoal-900/20 flex items-center justify-center hover:border-gold-500 hover:text-gold-600 transition-colors">
              <LinkedinIcon size={16} />
            </a>
          </div>

          <div className="aspect-video w-full bg-charcoal-900/5 flex items-center justify-center border border-charcoal-900/10">
            <div className="text-center text-charcoal-700/50 text-sm">
              <MapPin size={24} className="mx-auto mb-2" />
              Map location placeholder — Sialkot, Pakistan
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-3 bg-cream-200 p-8 md:p-10"
        >
          <h2 className="font-display text-2xl text-charcoal-900 mb-8">Send Us a Message</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm text-charcoal-900 mb-2">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                className={inputClass}
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-red-700 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-charcoal-900 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                className={inputClass}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
              />
              {errors.email && <p className="text-red-700 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="phone" className="block text-sm text-charcoal-900 mb-2">
                Phone Number
              </label>
              <input id="phone" type="tel" className={inputClass} {...register('phone')} />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm text-charcoal-900 mb-2">
                Subject *
              </label>
              <input
                id="subject"
                type="text"
                className={inputClass}
                {...register('subject', { required: 'Subject is required' })}
              />
              {errors.subject && <p className="text-red-700 text-xs mt-1">{errors.subject.message}</p>}
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="block text-sm text-charcoal-900 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              rows={6}
              className={inputClass}
              {...register('message', { required: 'Message is required' })}
            />
            {errors.message && <p className="text-red-700 text-xs mt-1">{errors.message.message}</p>}
          </div>

          <Button type="submit" size="lg" loading={isSubmitting}>
            <Send size={16} />
            Send Message
          </Button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;

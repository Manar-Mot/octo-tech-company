import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useLocale } from '@/src/contexts/LocaleContext';
import { getValidationMessages } from '@/src/lib/validation/contact-us-validation';


interface ContactFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, onError }) => {
  const t = useTranslations('contact');
  const locale = "ar"
  // 
  const validationMessages = getValidationMessages(t);

  const contactSchema = z.object({
    name: z.string().min(1, { message: validationMessages.nameRequired }),
    email: z.string().email({ message: validationMessages.invalidEmail }),
    message: z.string().min(1, { message: validationMessages.messageRequired }),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: any) => {
    setLoading(true);
    onError("");
    onSuccess("");

    try {
      const response = await axios.post('/api/contactMessage', { ...formData, lang: locale });

      if (response.status === 200) {
        onSuccess(t('success'));
        reset(); 
      } else {
        onError(response?.data.message || t('error'));
      }
    } catch (error) {
      onError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full mx-auto">
      <div>
        <label htmlFor="name" className="block text-[16px] lg:text-[18px] font-medium text-gray-700">
          {t('name')}:
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-red-500 text-sm">{String(errors.name.message)}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-[16px] lg:text-[18px] font-medium text-gray-700">
          {t('email')}:
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-[16px] lg:text-[18px] font-medium text-gray-700">
          {t('message')}:
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={4} 
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[16px] ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
        ></textarea>
        {errors.message && <p className="text-red-500 text-sm">{String(errors.message.message)}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-[16px] font-medium text-white ${
          loading
            ? 'bg-gray-400'
            : 'bg-accent hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        }`}
      >
        {loading ? t('sending') : t('send')}
      </button>
    </form>
  );
};

export default ContactForm;

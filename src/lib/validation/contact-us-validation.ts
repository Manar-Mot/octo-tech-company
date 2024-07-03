import { useTranslations } from 'next-intl';

export const getValidationMessages = (t: any) => ({
  nameRequired: t('validation.nameRequired'),
  invalidEmail: t('validation.invalidEmail'),
  messageRequired: t('validation.messageRequired'),
});

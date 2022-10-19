import useLocale from '@/store/locale';
import defaultLocale from '@/locale';

interface LocaleProps {
  [key: string]: {
    [key: string]: string;
  };
}

function useSwitchLocale(localeObj?: LocaleProps) {
  const [locale] = useLocale();

  return (localeObj || defaultLocale || {})[locale] || {};
}

export default useSwitchLocale;

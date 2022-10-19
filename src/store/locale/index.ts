import { atom, useRecoilState } from 'recoil';

const localeState = atom<string>({
  key: 'locale-state',
  default: 'en-US',
});

function useLocale(): [string, (locale: string) => void] {
  const [locale, setLocale] = useRecoilState(localeState);

  return [locale, setLocale];
}

export default useLocale;

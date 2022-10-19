import { useEffect, useState } from 'react';

interface ClientInfo {
  width: number;
  height: number;
}
const useWindowClientInfo = () => {
  const [clientInfo, setClientInfo] = useState<ClientInfo>({ width: 0, height: 0 });
  useEffect(() => {
    const getClientInfo = () => {
      const { width, height } = document.documentElement.getBoundingClientRect();
      console.log(width, height);
      setClientInfo({
        width,
        height,
      });
    };
    getClientInfo();
    window.addEventListener('resize', getClientInfo);
    return () => window.removeEventListener('resize', getClientInfo);
  }, []);

  return clientInfo;
};

export default useWindowClientInfo;

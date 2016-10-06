const { REVERSE_PROXY_PUBLIC_IP, PORT } = process.env;

export const networkAddress = (
  REVERSE_PROXY_PUBLIC_IP === 'localhost' ? `${REVERSE_PROXY_PUBLIC_IP}:${PORT}`
  : REVERSE_PROXY_PUBLIC_IP
);

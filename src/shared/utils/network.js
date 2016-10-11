const { REVERSE_PROXY_PUBLIC_IP, PORT } = process.env;

const networkAddress = (
  REVERSE_PROXY_PUBLIC_IP === 'localhost' ? `${REVERSE_PROXY_PUBLIC_IP}:${PORT}`
  : REVERSE_PROXY_PUBLIC_IP
);

export default networkAddress;

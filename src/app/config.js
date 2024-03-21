function setting({ prod, dev }) {
  return import.meta.env.PROD ? prod : dev;
}

const config = {
  env: import.meta.env,
  urls: {
    api: setting({
      prod: import.meta.env.VITE_API_URL || 'https://109.228.50.25:8080',
      dev: 'https://109.228.50.25:8080',
    }),
    ws: setting({
      prod: import.meta.env.VITE_API_URL || 'wss://109.228.50.25:8080',
      dev: 'wss://109.228.50.25:8080',
    }),
    client: setting({
      prod: import.meta.env.VITE_CLIENT_URL || 'http://localhost:5173',
      dev: 'http://localhost:5173',
    }),
  },
  api: {
    artificialDelay: setting({ prod: false, dev: false }),
  },
  auth: {
    applyAuth: setting({ prod: true, dev: false }),
  },
};

export default config;

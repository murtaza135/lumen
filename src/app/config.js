function setting({ prod, dev }) {
  return import.meta.env.PROD ? prod : dev;
}

const config = {
  env: import.meta.env,
  urls: {
    api: setting({
      prod: import.meta.env.VITE_API_URL || 'http://109.228.50.25:8080',
      // dev: 'http://localhost:3004',
      dev: 'http://109.228.50.25:8080',
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
    applyAuth: setting({ prod: true, dev: true }),
  },
};

export default config;

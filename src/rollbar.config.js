export default {
  accessToken: process.env.VUE_APP_ROLLBAR,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'prod',
    client: {
      javascript: {
        code_version: '3.1.0',
      }
    }
  },
};
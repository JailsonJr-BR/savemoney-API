export const auth = {
  secret: String(process.env.AUTH_SECRET),
  expiresIn: '1d',
};

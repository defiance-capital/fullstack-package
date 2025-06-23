export default () => ({
  secret: process.env.JWT_SECRET_KEY || 'secret',
  signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRE_TIME || '3600', 10) },
});

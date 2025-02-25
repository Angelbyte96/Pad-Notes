module.exports = () => {
    return async (ctx, next) => {
      ctx.request.headers['x-forwarded-proto'] = 'https';
      console.log('Forzando x-forwarded-proto:', ctx.request.headers['x-forwarded-proto']);
      await next();
    };
  };
  
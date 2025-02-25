module.exports = () => {
    return async (ctx, next) => {
      ctx.request.headers['x-forwarded-proto'] = 'https';
      ctx.secure = true; // Forzamos la propiedad secure en el contexto
      await next();
    };
  };
  
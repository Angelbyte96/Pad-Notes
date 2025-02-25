module.exports = () => {
    return async (ctx, next) => {
      // Forzar la cabecera
      ctx.request.headers['x-forwarded-proto'] = 'https';
      // Forzar la propiedad de Koa
      ctx.secure = true;
      // Forzar que la conexión se considere cifrada
      if (ctx.req && ctx.req.connection) {
        ctx.req.connection.encrypted = true;
      }
      if (ctx.request.socket) {
        ctx.request.socket.encrypted = true;
      }
      await next();
    };
  };
  
export const isRefreshTokenAsString = (refreshToken: unknown) => {
  return typeof refreshToken === 'string';
};

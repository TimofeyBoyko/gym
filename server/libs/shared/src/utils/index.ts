export const getUserId = (req: Express.Request) => {
  const user: Express.User & { id?: string } = req.user;

  return user.id;
};

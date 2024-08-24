export type JwtPayload = {
  email: string;
  sub: number; // subject 識別するための userId
};

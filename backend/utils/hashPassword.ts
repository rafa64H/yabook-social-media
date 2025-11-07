import bcrypt from "bcrypt";

export default async function hashPassword(rawPassword: string) {
  const hashedPassword = await bcrypt.hash(rawPassword, 10);
  return hashedPassword;
}

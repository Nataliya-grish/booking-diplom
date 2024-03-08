import * as bcrypt from 'bcrypt';
import { UserSchema } from '../../users/schema/users.schema';

const saltRounds = 10;

export const getHash: (pass: string) => Promise<string> = async (
  pass: string,
) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(pass, salt);
  return hashedPassword;
};

export const compareHash: (
  password: string,
  hashedPassword: string,
) => Promise<boolean> = async (password: string, hashedPassword: string) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};


UserSchema.pre('save', async function (next) {
  try {
    this.passwordHash = await getHash(this.passwordHash);
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods = {
  async validateHash(password: string): Promise<boolean> {
    return await compareHash(password, this.passwordHash);
  },
};

export { UserSchema };
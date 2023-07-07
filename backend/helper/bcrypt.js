import bcrpt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrpt.genSalt(8);
    const hash = await bcrpt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error("bcrypt hash error");
  }
};

export const comparePassword = async (plain, hashed) => {
  try {
    const compare = await bcrpt.compare(plain, hashed);
    return compare;
  } catch (error) {
    throw new Error("bcrypt compare error");
  }
};

import bcrypt from 'bcrypt';

export const hashPassword = async (text: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(text, salt);
};

export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(plainPassword, hashedPassword);
    return isPasswordValid;
};
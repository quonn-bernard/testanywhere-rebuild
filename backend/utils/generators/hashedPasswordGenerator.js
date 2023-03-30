import bcrypt from "bcryptjs";

const hashedPWGenerator = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}

export {
    hashedPWGenerator
}
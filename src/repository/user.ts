import { PostSignUpReqeustType } from "@scouit/api-types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  createUser = async (userInfo: PostSignUpReqeustType) => {
    await prisma.user.create({
      data: {
        email: userInfo.email,
        name: userInfo.name,
        password: userInfo.password,
      },
    });
  };
  findByUserId = async (userId: string) => {
    const findUserRecord = await prisma.user.findFirst({
      where: { email: userId },
    });
    console.info(findUserRecord);
    return findUserRecord;
  };
  getUserProfile = async () => {};
}

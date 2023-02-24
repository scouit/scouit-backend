import { PrismaClient } from "@prisma/client";
import {
  ProjectType,
  ActivityType,
  EducationType,
  WorkExperienceType,
  TechnologyType,
  BasicType,
  IntroduceType,
} from "@scouit/api-types";
import { commonError } from "../constants/error";
import { ErrorResponse } from "../utils/error-res";

const prisma = new PrismaClient();

export class ProfileRepository {
  findByUserId = async (userId: string) => {
    const userRecord = await prisma.user.findUnique({
      where: { email: userId },
      include: {
        introduce: true,
        activity: true,
        basic: true,
        education: true,
        technology: true,
        workExprience: true,
      },
    });
    return userRecord;
  };

  activityUserProfile = async (userId: string, activity: ActivityType[]) => {
    if (!activity) {
      throw new ErrorResponse(commonError.badRequest);
    }

    // await Promise.all(
    //   activity.map(
    //     async ({ name, content = "", period }) =>
    //       await prisma.activity.upsert({
    //         where: { email: userId },
    //         create: {
    //           email: userId,
    //           name,
    //           content,
    //           period,
    //         },
    //         update: {
    //           email: userId,
    //           name,
    //           content,
    //           period,
    //         },
    //       })
    //   )
    // );
  };

  educationUserProfile = async (userId: string, education: EducationType[]) => {
    if (!education) {
      throw new ErrorResponse(commonError.badRequest);
    }

    // await Promise.all(
    //   education.map(
    //     async ({ name, period }) =>
    //       await prisma.education.upsert({
    //         where: { email: userId },
    //         create: {
    //           email: userId,
    //           name,
    //           period,
    //         },
    //         update: {
    //           email: userId,
    //           name,
    //           period,
    //         },
    //       })
    //   )
    // );
  };

  projectUserProfile = async (userId: string, proejct: ProjectType[]) => {
    if (!proejct) {
      throw new ErrorResponse(commonError.badRequest);
    }

    // await Promise.all(
    //   proejct.map(
    //     async ({ name, period, introduce = "", url }) =>
    //       await prisma.project.upsert({
    //         where: { email: userId },
    //         create: {
    //           email: userId,
    //           name,
    //           period,
    //           introduce,
    //           url: JSON.stringify(url),
    //         },
    //         update: {
    //           email: userId,
    //           name,
    //           period,
    //           introduce,
    //           url: JSON.stringify(url),
    //         },
    //       })
    //   )
    // );
  };

  introduceUserProfile = async (userId: string, introduce: IntroduceType) => {
    const { complex, simple } = introduce;
    if (!complex) {
      throw new ErrorResponse(commonError.badRequest);
    }

    if (!simple) {
      throw new ErrorResponse(commonError.badRequest);
    }

    await prisma.introduce.upsert({
      where: { email: userId },
      create: {
        email: userId,
        simple,
        complex,
      },
      update: {
        email: userId,
        simple,
        complex,
      },
    });
  };

  workExprienceProfile = async (
    userId: string,
    workExperiences: WorkExperienceType[]
  ) => {
    workExperiences.map(async (workExperience) => ({
      ...workExperience,
      email: userId,
      role: JSON.stringify(workExperience.role),
      works: JSON.stringify(workExperience.works),
    }));

    // await prisma.workExprience.createMany({
    //   data: workExperiences,
    //   skipDuplicates: true,
    // });
  };

  basicProfile = async (userId: string, { role }: BasicType) => {
    if (!role) {
      throw new ErrorResponse(commonError.badRequest);
    }
    await prisma.basic.upsert({
      where: { email: userId },
      create: {
        email: userId,
        role,
      },
      update: {
        email: userId,
        role,
      },
    });
  };

  technologyProfile = async (userId: string, { main, sub }: TechnologyType) => {
    if (!main) {
      throw new ErrorResponse(commonError.badRequest);
    }
    if (!sub) {
      throw new ErrorResponse(commonError.badRequest);
    }
    const JSONmain = JSON.stringify(main);
    const JSONsub = JSON.stringify(sub);

    await prisma.technology.upsert({
      where: { email: userId },
      create: {
        email: userId,
        main: JSONmain,
        sub: JSONsub,
      },
      update: {
        email: userId,
        main: JSONmain,
        sub: JSONsub,
      },
    });
  };
}

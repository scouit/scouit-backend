import { PrismaClient } from "@prisma/client";
import {
  ProjectType,
  ActivityType,
  EducationType,
  WorkExperienceType,
  TechnologyType,
  BasicType,
  IntroduceType,
  QueryProfileWriteType,
} from "@scouit/api-types";
import { commonError } from "../constants/error";
import { ErrorResponse } from "../utils/error-res";

const prisma = new PrismaClient();

type Query = "activity";

interface P {
  query: Query;
  where: any;
}

export class ProfileRepository {
  findByUserId = async (userId: number) => {
    const userRecord = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        introduce: true,
        activity: true,
        basic: true,
        education: true,
        technology: true,
        workExprience: true,
        projects: true,
      },
    });
    return userRecord;
  };

  activityUserProfile = async (userId: number, activity: ActivityType[]) => {
    if (!activity) {
      throw new ErrorResponse(commonError.badRequest);
    }
  };

  educationUserProfile = async (userId: number, education: EducationType[]) => {
    if (!education) {
      throw new ErrorResponse(commonError.badRequest);
    }

    await Promise.all(
      education.map(
        async ({ name, period }, idx) =>
          await prisma.education.upsert({
            where: { order: idx },
            create: {
              userId,
              order: idx,
              name,
              period,
            },
            update: {
              name,
              period,
            },
          })
      )
    );
  };

  projectUserProfile = async (userId: number, proejct: ProjectType[]) => {
    if (!proejct) {
      throw new ErrorResponse(commonError.badRequest);
    }

    await Promise.all(
      proejct.map(
        async ({ name, period, introduce = "", url }, idx) =>
          await prisma.project.upsert({
            where: { order: idx },
            create: {
              userProfileId: userId,
              order: idx,
              name,
              period,
              introduce,
              works: "",
              skills: "",
              images: "",
              url: JSON.stringify(url),
            },
            update: {
              name,
              order: idx,
              period,
              introduce,
              works: "",
              skills: "",
              images: "",
              url: JSON.stringify(url),
            },
          })
      )
    );
  };

  introduceUserProfile = async (userId: number, introduce: IntroduceType) => {
    const { complex, simple } = introduce;
    if (!complex) {
      throw new ErrorResponse(commonError.badRequest);
    }

    if (!simple) {
      throw new ErrorResponse(commonError.badRequest);
    }

    await prisma.introduce.upsert({
      where: { userId },
      create: {
        userId,
        simple,
        complex,
      },
      update: {
        userId,
        simple,
        complex,
      },
    });
  };

  workExprienceProfile = async (
    userId: number,
    workExperiences: WorkExperienceType[]
  ) => {
    workExperiences.map(
      async (workExperience, idx) =>
        await prisma.workExprience.upsert({
          where: {
            order: idx,
          },
          create: {
            ...workExperience,
            userId,
            order: idx,
            role: JSON.stringify(workExperience.role),
            works: JSON.stringify(workExperience.works),
          },
          update: {
            ...workExperience,
            userId,
            order: idx,
            role: JSON.stringify(workExperience.role),
            works: JSON.stringify(workExperience.works),
          },
        })
    );
  };

  basicProfile = async (userId: number, basic: BasicType) => {
    if (!basic.role) {
      throw new ErrorResponse(commonError.badRequest);
    }
    await prisma.basic.upsert({
      where: { userId },
      create: {
        userId,
        role: basic.role,
      },
      update: {
        role: basic.role,
      },
    });
  };

  technologyProfile = async (userId: number, { main, sub }: TechnologyType) => {
    if (!main) {
      throw new ErrorResponse(commonError.badRequest);
    }
    if (!sub) {
      throw new ErrorResponse(commonError.badRequest);
    }
    const JSONmain = JSON.stringify(main);
    const JSONsub = JSON.stringify(sub);

    await prisma.technology.upsert({
      where: { userId },
      create: {
        userId,
        main: JSONmain,
        sub: JSONsub,
      },
      update: {
        userId,
        main: JSONmain,
        sub: JSONsub,
      },
    });
  };

  // write = async ({ query, where }: P) => {
  //   await prisma[query].upsert({
  //     where: where,
  //     create: {},
  //     update: {},
  //   });
  // };
}

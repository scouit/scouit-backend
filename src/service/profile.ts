import {
  PatchProfileWriteRequestType,
  QueryProfileWriteType,
} from "@scouit/api-types";
import { commonError } from "../constants/error";
import { ProfileRepository } from "../repository/profile";
import { ErrorResponse } from "../utils/error-res";

export class ProfileService {
  private profileRepository;

  constructor() {
    this.profileRepository = new ProfileRepository();
  }

  write = async (
    type: QueryProfileWriteType,
    userId: string,
    body: PatchProfileWriteRequestType
  ) => {
    switch (type) {
      case "activity":
        if (!body.activity) {
          throw new ErrorResponse(commonError.badRequest);
        }
        await this.profileRepository.activityUserProfile(userId, body.activity);
        return;
      case "education":
        if (!body.education) {
          throw new ErrorResponse(commonError.badRequest);
        }
        await this.profileRepository.educationUserProfile(
          userId,
          body.education
        );
        return;
      case "introduce":
        if (!body.introduce) {
          throw new ErrorResponse(commonError.badRequest);
        }
        await this.profileRepository.introduceUserProfile(
          userId,
          body.introduce
        );
        return;
      case "project":
        if (!body.project) {
          throw new ErrorResponse(commonError.badRequest);
        }
        await this.profileRepository.projectUserProfile(userId, body.project);
        return;
      case "work-experience":
        await this.profileRepository.workExprienceProfile(
          userId,
          body.workExperience
        );
        return;
      case "basic":
        await this.profileRepository.basicProfile(userId, body.basic);
        return;
      case "technology":
        if (!body.technology) {
          throw new ErrorResponse(commonError.badRequest);
        }
        await this.profileRepository.technologyProfile(userId, body.technology);
        return;
      default:
        throw new ErrorResponse(commonError.invalidQuery);
    }
  };

  getById = async (userId: string) => {
    const userProfile = await this.profileRepository.findByUserId(userId);
    return userProfile;
  };
}

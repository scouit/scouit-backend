import {
  PostSignInReqeustType,
  PostSignUpReqeustType,
} from "@scouit/api-types";
import { commonError } from "../constants/error";
import { JWTHelper } from "../helper/jwt";
import { UserRepository } from "../repository/user";
import { ErrorResponse } from "../utils/error-res";
import { comparePassword, generatePasswordHash } from "../utils/hash";

export class AuthService {
  private userRepository;
  private JWTHelper;

  constructor() {
    this.userRepository = new UserRepository();
    this.JWTHelper = new JWTHelper();
  }

  signup = async (userInfo: PostSignUpReqeustType) => {
    const alreadyRegisteredUser = await this.userRepository.findByUserId(
      userInfo.email
    );

    if (alreadyRegisteredUser) {
      throw new ErrorResponse(commonError.conflict);
    }

    const hashedPassword = await generatePasswordHash(userInfo.password);

    const userRecord = await this.userRepository.createUser({
      ...userInfo,
      password: hashedPassword,
    });

    return userRecord;
  };

  signIn = async (userInfo: PostSignInReqeustType) => {
    const user = await this.userRepository.findByUserId(userInfo.email);
    if (!user) {
      throw new ErrorResponse(commonError.unauthorized);
    }
    const isValid = comparePassword(user.password, userInfo.password);
    if (!isValid) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    const tokens = this.JWTHelper.generateJwtTokens({ userId: user.email });
    return tokens;
  };
}

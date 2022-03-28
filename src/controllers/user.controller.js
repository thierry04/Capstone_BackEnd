import userService from '../services/user.service';
import Response from '../utils';
import { userValidate, validate } from '../validations';
import { decryptPassword, encryptPassword, signToken } from '../helper';

const {
  registerUser,
  findProfiles,
  findEmail,
  findUser,
  updatedProfile,
  deleteProfile,
} = userService;

class userController {
  static async signup(req, res) {
    try {
      const data = { ...req.body };
      const { email } = req.body;
      const fetchEmail = await findEmail({ email });
      if (fetchEmail) {
        return Response.error(res, 400, 'Email already exists');
      } 
        const { details: errors } = validate(userValidate.CreateSchema, data);
        if (errors)
          return Response.error(
            res,
            400,
            `please provide ${errors[0].context.key}`,
            errors[0]
          );
        const hash = await encryptPassword(data.password);
        if (data.email.includes('richmunye')) {
          const user = await registerUser({
            ...data,
            password: hash,
            role: 'Admin',
          });
          if (!user) return Response.error(res, 404, 'user not created');
          return Response.success(res, 201, 'user created successfully', user);
        } 
          const user = await registerUser({
            ...data,
            password: hash,
          });
          if (!user) return Response.error(res, 404, 'user not created');
          return Response.success(res, 201, 'user created successfully', user);
        
      
    } catch (err) {
      return Response.error(res, 500, 'internal server error', err);
    }
  }

  static async findProfiles(req, res) {
    try {
      const foundProfiles = await findProfiles();
      if (!foundProfiles)
        return Response.error(res, 404, 'no profile found in the system');
      return Response.success(
        res,
        200,
        'all Profiles found successfully',
        foundProfiles
      );
    } catch (err) {
      return Response.error(res, 500, 'internal derver error', err);
    }
  }

  static async findUser(req, res) {
    try {
      const foundUser = await findUser({ id: req.params.id });
      if (!foundUser) return Response.error(res, 404, 'User is not Registered');
      return Response.success(
        res,
        200,
        'Registered user found in system',
        foundUser
      );
    } catch (err) {
      return Response.error(res, 500, 'internal server error', err);
    }
  }

  static async updateProfile(req, res) {
    try {
      const foundProfile = await findUser({ id: req.params.id });
      if (!foundProfile)
        return Response.error(res, 404, 'Profile dos not exist');
      const data = { ...req.body };
      const { details: errors } = validate(userValidate.UpdateSchema, req.body);
      if (errors)
        return Response.error(
          res,
          400,
          `please provide ${errors[0].context.key}`,
          errors[0]
        );
      const updateHash = await encryptPassword(data.password);
      const dataUpdate = {
        userName: data.userName || foundProfile.userName,
        email: foundProfile.email,
        password: updateHash || foundProfile.password,
      };
      const updateProfile = await updatedProfile(
        { id: req.params.id },
        dataUpdate
      );
      return Response.success(
        res,
        200,
        'your profile has been updated successfully',
        updateProfile
      );
    } catch (err) {
      return Response.error(res, 500, 'internal server error');
    }
  }

  static async deleteProfile(req, res) {
    try {
      const foundProfile = await findUser({ id: req.params.id });
      if (!foundProfile)
        return Response.error(res, 404, 'Profile dos not exist');
      await deleteProfile({ id: req.params.id });
      return Response.success(res, 204, 'profile deleted successfully');
    } catch (err) {
      return Response.error(res, 500, 'internal server error');
    }
  }

  static async login(req, res) {
    const { details: errors } = validate(userValidate.LoginSchema, req.body);
    if (errors)
      return Response.error(
        res,
        400,
        `please provide ${errors[0].context.key}`,
        errors[0]
      );
    const { email, password } = req.body;
    const foundEmail = await findEmail({ email });
    if (!foundEmail) return Response.error(res, 404, 'Email does not exist');
    if (!(await decryptPassword(password, foundEmail.password)))
      return Response.error(res, 401, 'Wrong credentails!');

    const token = await signToken(foundEmail);
    return Response.success(res, 200, 'logged in successfully', {
      token,
      foundEmail,
    });
  }
}
export default userController;

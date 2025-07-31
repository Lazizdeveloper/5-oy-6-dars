import { ClientError, globalError } from "shokhijakhon-error-handler";
import { registerValidator, loginValidator } from "../utils/validator.js";
import UserModel from "../model/User.model.js";
import { HashService } from "../lib/hash.js";
import { JwtService } from "../lib/jwt.js";

export default {
  REGISTER: async (req, res) => {
    try {
      const newUser = req.body;
      const { error } = await registerValidator.validateAsync(newUser, { abortEarly: false });
      if (error) throw new ClientError(error.message, 400);

      const existingUser = await UserModel.findOne({ email: newUser.email });
      if (existingUser) throw new ClientError("Email already exists", 400);

      newUser.password = await HashService.hashPassword(newUser.password);

      const user = new UserModel(newUser);
      await user.save();

      const token = JwtService.generateToken({ id: user._id, email: user.email });

      return res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
      return globalError(err, res);
    }
  },

  LOGIN: async (req, res) => {
    try {
      const { email, password } = req.body;
      const { error } = await loginValidator.validateAsync({ email, password }, { abortEarly: false });
      if (error) throw new ClientError(error.message, 400);

      const user = await UserModel.findOne({ email });
      if (!user) throw new ClientError("Invalid email or password", 401);

      const isMatch = await HashService.comparePasswords(password, user.password);
      if (!isMatch) throw new ClientError("Invalid email or password", 401);

      const token = JwtService.generateToken({ id: user._id, email: user.email });

      return res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      return globalError(err, res);
    }
  },
};
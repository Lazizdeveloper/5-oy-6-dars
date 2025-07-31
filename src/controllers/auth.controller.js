import { ClientError, globalError } from "shokhijakhon-error-handler";
import { registerValidator } from "../utils/validator.js";
import UserModel from "../model/User.model.js";
export default{
    REGISTER: async function(req,res) {
        try {
            let newUser = req.body
            let validate= await registerValidator.validateAsync(newUser,{abortEarly:false});
            if(validate.error) throw new ClientError(validate.error.message,400);
            let newUserInsert= await UserModel(newUser);
            await newUserInsert.validate();
            await newUserInsert.save()
            return res.json({message:"Success"})
        } catch (err) {
            return globalError(err,res);
        }
    }
}
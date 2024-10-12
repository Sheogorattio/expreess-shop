import bcrypt from "bcrypt";
import validator from "validator";
import axios from "axios";

export const checkUser = (req, res, next)=> {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user.username;
    } else {
        res.locals.user = null;
    }
    next();
}

export const registerUser = async (req, res, next) => {
    const reExp = new RegExp('^(?=.*\\w)(?=.*\\W)(?=.*\\d).{8,}');
    if(req.body&&
        req.body.username&&
        req.body.email&&
        req.body.password&&
        req.body.confirmPassword&&
        req.body.confirmPassword ===   req.body.password&&
        reExp.test(req.body.password)&&
        validator.isEmail(req.body.email)
    )
    {
        try{
            const {username, email, password} = req.body;

            const userByName = (await axios.get(process.env.API_URL + `/users?username=${username}`)).data.length>0;
            const userByEmail = (await axios.get(process.env.API_URL + `/users?email=${email}`)).data.length>0;

            console.log(userByName);
            console.log(userByEmail);

            if(userByName || userByEmail){
                res.status(400).redirect('/');
            }
            else
            {
                const newUser = {
                    username: username,
                    email: email,
                    password: hashPassword(password)
                }
                const responce = (await axios.post(process.env.API_URL + `/users`, newUser)).status;
                console.log(responce);
                if(responce == 201){
                    next();
                }
                else{
                    res.status(500).send('Error creating user');
                }
            }
        }
        catch(e){
            console.error("Error during user registration:", error);
            res.status(500).send("Internal Server Error");
        }
    }
    else {
        res.status(400).send("Invalid registration data");
    }
}

function hashPassword(password) {
    try {
        const saltRounds = bcrypt.genSaltSync(10);
        const hashedPassword =  bcrypt.hashSync(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}
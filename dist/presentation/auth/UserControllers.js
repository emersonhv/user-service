"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const domain_1 = require("../../domain");
//import { UserModel } from "../../data/postgres";
const login_user_usecase_1 = require("../../domain/use-cases/auth/login-user.usecase");
const is_login_user_usecase_1 = require("../../domain/use-cases/auth/is-login-user.usecase");
class UserController {
    constructor(authRepository) {
        this.authRepository = authRepository;
        this.handleError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error); //Winston
            return res.status(500).json({ error: 'Internal Server Error' });
        };
        this.registerUser = (req, res) => {
            const [error, registerUserDto] = domain_1.RegisterUserDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new domain_1.RegisterUser(this.authRepository)
                .execute(registerUserDto)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        };
        this.loginUser = (req, res) => {
            const [error, loginUserDto] = domain_1.LoginUserDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new login_user_usecase_1.LoginUser(this.authRepository)
                .execute(loginUserDto)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        };
        this.getUser = (req, res) => {
            /*UserModel.findAll()
                .then(users => {
                    res.json({
                        token: req.body.user,
                        users,
                    })
                })
                .catch(() => res.status(500).json({error:'Internal server error'}));*/
        };
        this.isLoginUser = (req, res) => {
            const { token } = req.params;
            new is_login_user_usecase_1.IsLoginUser(this.authRepository)
                .execute(token)
                .then(data => res.send(data))
                .catch(error => this.handleError(error, res));
        };
    }
}
exports.UserController = UserController;

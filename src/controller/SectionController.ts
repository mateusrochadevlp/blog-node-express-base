import {type Request, type Response} from "express"
import { prisma } from "../libs/prisma"
import {compare, hash} from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class SectionControler{
    public async signUp(request:Request, response:Response ){

    const {name, email, password} = request.body;
    const userExist = await prisma.user.findFirst({
        where: {
            email,
        }
    });
    if (userExist) {
        return response.json({erro: "usuario ja existe"})
    }
    const passwordHash = await hash(password, 10)
    const user = await prisma.user.create({
        data: {
        name,
        email,
        password: passwordHash,
        },
    });
    return response.json(user)
    }
    public async signIn(request:Request, response:Response ){
        const {email, password} = request.body;

        const userExist = await prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (!userExist) {
            return response.json({erro: "email não cadastrado"})
        }

        const passwordMatch = await compare(password, userExist.password)

        if (!passwordMatch) {
            return response.json('erro senha incorreta')
        }

        const token = await jwt.sign (
            {id: userExist.id},
             process.env.SECRET_JWT || "" 
        );
        return response.json({token});
     }
}
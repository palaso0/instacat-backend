import { Request, Response } from "express"
import { User } from "../models/user.model"
import { sign, SignOptions } from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
    const payload = {
        name: 'Andrés Reales',
        userId: 123,
        accessTypes: [
            'getTeams',
            'addTeams',
            'updateTeams',
            'deleteTeams'
        ]
    };
    // read private key value
    const privateKey = "instaCat"

    const signInOptions: SignOptions = {
        algorithm: 'RS256',
        expiresIn: '1h'
    };

    // generate JWT
    const tokenSign = sign(payload, privateKey, signInOptions)
    res.json({ "Firmado": true });
}

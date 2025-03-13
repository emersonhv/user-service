import jwt from 'jsonwebtoken';

const JWT_SEED = process.env.JWT_SEED;

export class JwtAdapter {

    static async generateToken(payload: Object, duration: string = '2h'): Promise<string | null> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, JWT_SEED!, { expiresIn: '2Hour', algorithm: 'HS256' }, (err, token) => {
                if (err || !token) {
                    reject(err || new Error("Token generation failed"));
                } else {
                    resolve(token);
                }
            });
        });
    }

    static async validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED!, (err, decoded) => {
                if (err) return resolve(null);

                resolve(decoded as T);
            });
        });
    }
}
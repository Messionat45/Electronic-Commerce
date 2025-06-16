require('dotenv').config();

const jwtkey = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next)=>{
    let token = jwt
}

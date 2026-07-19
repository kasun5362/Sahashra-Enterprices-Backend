import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    let token = req.header("Authorization");
    
    if (token != null) {
        token = token.replace("Bearer ", "");
        try {
            const user = jwt.verify(token, process.env.SACHIN_JWT);
            req.user = user;
        } catch (error) {
            // CRITICAL: Return 401 if token is expired/invalid
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    }
    else{
        return res.status(401).json({ message: "Authorization token is missing" });
    }
}
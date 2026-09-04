import jwt, {} from "jsonwebtoken";
import { jwtSecret } from "../utils/envExports.js";
export const authMiddleware = (req, res, next) => {
    const token = req.headers["token"];
    if (!token) {
        res.status(400).json({
            message: "unAuthorized"
        });
        return;
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded.userId;
        if (!userId) {
            console.log("no userId found");
            res.status(500).json({
                message: "internal server error"
            });
            return;
        }
        else {
            req.userId = userId;
            next();
        }
    }
    catch (error) {
        console.log("error in the authMiddleware", error);
        res.status(500).json({
            message: "internal server error"
        });
    }
};
//# sourceMappingURL=authMiddleware.js.map
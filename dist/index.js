import express from "express";
import { PORT } from "./utils/envExports.js";
const app = express();
app.listen(PORT, () => {
    console.log("port is running on port ", PORT);
});
//# sourceMappingURL=index.js.map
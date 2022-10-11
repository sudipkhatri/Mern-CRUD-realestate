import {} from 'dotenv/config';
import express from 'express';
import URI from './db.js';
import router from './Routes/userRoutes.js';
import postRouter from './Routes/postRoutes.js';
import cors from 'cors';
import * as path from "path";
import { fileURLToPath } from "url";






const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', router);
app.use("/api/post", postRouter);
URI;

const PORT = process.env.PORT || 5000;
// server production
if(process.env.NODE_ENV === "production"){

    const __filename = fileURLToPath(import.meta.url);
    // 👇️ "/home/john/Desktop/javascript"
    const __dirname = path.dirname(__filename);
    app.use(express.static(path.join(__dirname, "/frontend/build")));
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
    });  
}
else{
    app.get('*', (req, res)=>{
        res.send('Api is running.')
    });
}

app.listen(PORT, ()=>{
    console.log(`server up and running on ${PORT} .`);
});
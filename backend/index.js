import express from 'express';
import { router as rootRouter } from './routes/index.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use("/api/v1",rootRouter);
app.use(cors());
app.use(express.json());

app.listen(PORT,()=>{
    console.log(PORT+": callback evoked."); 
})


/*
npm install --save body-parser
app.use(bodyparser.json()); //utilizes the body-parser package
If you are using Express 4.16+ you can now replace that line with:
app.use(express.json()); //Used to parse JSON bodies

If you also have the following code in your environment:

app.use(bodyParser.urlencoded({extended: true}));
You can replace that with:
app.use(express.urlencoded()); //Parse URL-encoded bodies
*/
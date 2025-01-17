import express from 'express';
import { router as Nkrouter  } from './routes/index.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use("/api/v1",Nkrouter);
app.use(cors());
app.use(express());




app.listen(PORT,()=>{
    console.log(PORT+": callback evoked."); 
})








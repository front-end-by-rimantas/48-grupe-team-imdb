import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import router from './router/index.js';
import helmet from 'helmet';

const PORT = 4840
const app = express();

const corsOptions = {
  origin: "http://localhost:4839",
};
const helmetOptions = {
  crossOriginResourcePolicy: false,
};

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// aplikacija pasiima visus routus is 'module' 
app.use(router);


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});
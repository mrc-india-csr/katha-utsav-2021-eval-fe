import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import index from './routes/index'
import api from './routes/api'
import path from 'path'
import csurf from 'csurf'
import {pool} from "./routes/middleware/initializers/pgdb";

const app = express()

if (process.env.NODE_ENV === 'production')
  app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  })
);

// app.use(csurf({
//   cookie: true,
//   value: (req) => (req.cookies.csrfToken)
// }));

app.set('views', path.join(__dirname, 'static', 'views'))
app.set('view engine', 'ejs')

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

app.use(compression())
app.use('/public', express.static(path.join(__dirname, 'static', 'public')))

app.use('/', index);
app.use('/api', api);

const port = process.env.PORT || 3000

app.listen(port, function listenHandler() {
  console.info(`Running on port ${port}`);
  if (process.send) {
    process.send({event: 'online', url: 'http://localhost:3000/'});
  }
})

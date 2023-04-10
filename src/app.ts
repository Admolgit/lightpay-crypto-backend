import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import router from './routes/index';
import {generateKeys} from './utils/encrypt';

require('dotenv').config();

const app = express();
generateKeys()

console.log("APP")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors({origin:true}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: createError.HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// // React is loaded and is available as React and ReactDOM
// // imports should NOT be used
// class Tooltip extends React.Component {

//   render() {
//     // Write your code here
//     return null;
//   }
// }

// class App extends React.Component {
//   state = {
//     text: ''
//   }

//   onDocumentClick = (event) => {
//     if (event.target.tagName === 'BUTTON') {
//       this.setState({ text: event.target.textContent })
//     }
//   }
  
//   componentDidMount() {
//     document.addEventListener('click', this.onDocumentClick)
//   }
//   componentWillUnmount() {
//     document.removeEventListener('click', this.onDocumentClick)
//   }

//   render() {
//     return <div>
//       {this.props.children}
//       <Tooltip text={this.state.text} tooltipId={this.props.tooltipId}/>
//     </div>
//   }
// }

// document.body.innerHTML = "<div id='root'></div><div id='tooltip'></div>";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App tooltipId={"tooltip"}>
//   <button id="button1">First button</button>
//   <button id="button2">Second button</button>
// </App>);

// setTimeout(() => {
//   document.getElementById("button2").click();

//   setTimeout(() => {
//     console.log(document.body.innerHTML);
//   }, 300);
// }, 300);

export default app;
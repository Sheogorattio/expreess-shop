import express  from "express"
import "dotenv/config"
import exphbs from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import {checkUser} from "./middlewares/user-middleware.js";

import routes from "./routes.js";

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    defaultLayout : "main",
    extname : "hbs"
});


const app = express();

app.engine("hbs", hbs.engine);
app.set("view engine" , "hbs");
app.set("views", "views")


app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(checkUser);
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(routes);


app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});
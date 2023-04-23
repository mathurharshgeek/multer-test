const express=require('express')
const path=require('path');
const ejs= require('ejs');
const multer=require('multer');
const app = express();
const publicDir = path.join(__dirname, "/public");
app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: true })); // So we can access the form input values
app.use(express.json());
app.set("view engine", "ejs");
app.set('views',path.join(__dirname,'/views'));
app.get('/',(req,res)=>res.render('home'));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    return cb (null, "./public/images");
    },
    filename: function (req, file, cb) {
    return cb (null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });
app.post("/", upload.single("image"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.render('show',{data:req.file.filename});
});
var PORT=8000;
app.listen(PORT,()=>{
    console.log("server has started");
})
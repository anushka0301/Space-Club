const blog = require("./models/blog");
var express              =require("express"),
    app                  =express(),
    bodyParser           =require("body-parser"),
    mongoose             =require("mongoose"),
    flash                =require("connect-flash"),
    passport             =require("passport"),
    localStrategy        =require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
    Blog                 =require("./models/blog"),
    Admin                =require("./models/admin"),
    methodOverride       =require("method-override");

mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true});
//mongoose.connect("mongodb+srv://user:password@cluster0.xkswv.mongodb.net/yelpcamp?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret: "Secrettexthere",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(Admin.authenticate()))
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})

//==========CAMPGROUNDS================================================================================

//LandingPage
app.get("/", function(req,res){
    res.render("landing");
})

//Index
app.get("/blogs", function(req,res){
    Blog.find({}, function(err,blogs){
        if(err)
            console.log(err)
        else
            res.render("blogs/blogs", {blogs:blogs});
    })    
})

//AddNewBlogForm
app.get("/blogs/new",isLoggedIn, function(req,res){
    res.render("blogs/new");
})

//AddNewBlog
app.post("/blogs",isLoggedIn, function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var body=req.body.body;
    var author=req.body.author;

    var newBlog={name:name, image:image, body:body, author:author}  
    Blog.create(newBlog, function(err, newlyCreated){
        if(err)
            console.log(err);
        else{
            req.flash("success","Blog added!");
            res.redirect("/blogs");
        }
            
    })
})

//Show
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err, found){
        if(err)
            console.log();
        else
            res.render("blogs/show", {blog:found});
    })
})

//DeleteBlog
app.delete("/blogs/:id",isLoggedIn, function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(){
        res.redirect("/blogs");
    })
})

//=========AUTHENTICATION============================================================================

//RegisterForm
app.get("/register", function(req,res){
    res.render("register");
})

//Register
app.post("/register", function(req,res){
    var newUser=new Admin({username: req.body.username});
    Admin.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Hi! Logged in as admin.");
            res.redirect("/blogs");
        })
    })
})

//LoginForm
app.get("/login", function(req,res){
    res.render("login");
})

//Login
app.post("/login", passport.authenticate("local",{
    successRedirect: "/blogs",
    failureRedirect: "/login"
}), function(req,res){
})

//Logout
app.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Succesfully logged out!")
    res.redirect("/blogs");
})

//============MIDDLEWARES========================================================================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        console.log("You are not an admin!");
        res.redirect("/login");
    }
}

app.listen(3000, function(){
    console.log("Blog server has started!");
})
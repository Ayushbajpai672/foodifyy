const express = require('express') ;
const app = express() ;
require('dotenv').config() ;
const path = require('path') ;
const cn = require('./config/mongoose-connection') ;
const { userModel, validateUser }  = require('./models/usermodel') ;

app.use(express.json()) ;
app.use(express.urlencoded({extended : true})) ;
app.use(express.static(path.join(__dirname, "public"))) ;

app.get('/', (req,res)=>{
    res.sendFile("./public/ayushproj.html",{root: __dirname}) ;
})

app.post("/submit", async (req, res) => {
    let { name, email, phone, message } = req.body;
    
    // Validate the input using Joi
    const { error } = validateUser({ name, email, phone, message });

    if (error) {
        return res.status(400).send("OOPS Something broke: " + error.details[0].message);
    }

    try {
        // Create a new user document
        let user = await userModel.create({
            name,
            email,
            phone,
            message,
        });

        res.redirect("/");
    } catch (err) {
        res.status(500).send("Internal Server Error: " + err.message);
    }
});

app.listen(process.env.PORT || 5000) ;
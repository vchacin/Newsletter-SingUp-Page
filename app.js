const express  = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express ();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

    const firstName = req.body.inputName;
    const email = req.body.inputEmail;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    // API Key Server
    const url = "https://us7.api.mailchimp.com/3.0/lists/8d3788351d";

    const options = {
        method: "POST",
        auth: "vchacin:b48c324b5687b22ebba9d9e0ad5c708b-us7"
    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
        
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});


// API Key
// b48c324b5687b22ebba9d9e0ad5c708b-us7

// List ID
// 8d3788351d
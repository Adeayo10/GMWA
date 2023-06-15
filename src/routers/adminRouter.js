const express = require("express");
const debug = require("debug")("app:adminRouter")
const {MongoClient} = require("mongodb")
const sessions = require("../data/sessions.json");

const adminRouter = express.Router()

adminRouter.route("/").get((req, res)=>{
    const url ="mongodb+srv://Adeayo:genesis1v1@cluster0.66ql7t2.mongodb.net/?retryWrites=true&w=majority";
    const dbname = "Globolmantics";
    
    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url);
            debug("connected to mongodb")

            const db = client.db(dbname);
            const response = await db.collection("sessions").insertMany(sessions);
            res.json(response);
        } catch (error) {
            debug(error.stack)
        }
        client.close();
    })();
})

module.exports = adminRouter;
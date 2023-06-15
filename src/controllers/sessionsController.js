const debug = require("debug")("app:sessionsRouter");
const { MongoClient, ObjectId } = require("mongodb");
const speakerService = require("../services/speakerService");
const url =
  "mongodb+srv://Adeayo:genesis1v1@cluster0.66ql7t2.mongodb.net/?retryWrites=true&w=majority";
const dbname = "Globolmantics";

function sessionsController() {
  async function sessions(req, res) {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("connected to mongodb");
      const db = client.db(dbname);
      const sessions = await db.collection("sessions").find().toArray();

      res.render("sessions", {
        sessions,
      });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  }

  async function session(req, res){
    const id = req.params.id;
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("connected to mongodb");
      const db = client.db(dbname);
      const session = await db
        .collection("sessions")
        .findOne({ _id: new ObjectId(id) });

      const speaker = await speakerService.getSpeakerById(
        session.speakers[0].id
      );

      session.speaker = speaker.data;

      res.render("session", {
        session,
      });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  
  }

  return { sessions, session};
}
module.exports = sessionsController()

const router = require("express").Router();
const Workout = require("../models");
const path = require("path");

let db = require("../models");

// ==========HTML Routes===============

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));

});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));

});



// ===========API Routes===============


router.get("/api/workouts", (req, res) => {
  console.log("Inside lastworkout route");
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

router.post("/api/workouts", ({ body }, res) => {
  console.log("New workout route");
  console.log(body);
    db.Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
});
  
router.put("/api/workouts/:id", (req, res) => {

  console.log("inside put route");

  const id = req.params.id;
  const exercise = req.body;
  db.Workout.findOneAndUpdate({ _id: id}, { $push: { exercises: exercise} })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(404).json(err);
  });

});



module.exports = router;
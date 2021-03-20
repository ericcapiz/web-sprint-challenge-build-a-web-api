// Write your "actions" router here!
const {Router} = require('express');
const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();

//GET ACTIONS

router.get('/', (req, res) => {
    Actions
        .get()
        .then(actions => {
            res
                .status(200)
                .json(actions);
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({message: 'error retrieving actions'});
        })
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    Actions
        .get(id)
        .then(actions => {
            if (actions) {
                res
                    .status(200)
                    .json(actions);
            } else {
                res
                    .status(404)
                    .json({message: 'Action not found with that id'})
            }
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({message: 'error getting actions by id'})
        })
})

//POST ACTIONS

router.post("/", (req, res) => {
    const newAction = req.body;

    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res
            .status(400)
            .json({message: "missing info to create new action"});
    } else {
        Actions
            .insert(newAction)
            .then((newAct) => {
                res
                    .status(201)
                    .json(newAct);
            })
            .catch((error) => {
                res
                    .status(500)
                    .json({message: error.message});
            });
    }
});

//PUT ACTIONS

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const update = req.body;
  
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
      res.status(400).json({ errorMessage: "missing info to update" });
    } else {
      Actions.update(id, update)
        .then((updated) => {
          res.status(200).json(updated);
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    }
  });

//DELETE ACTIONS

router.delete("/:id", (req, res) => {
    const { id } = req.params;
  
    Actions.remove(id)
      .then((deleteAct) => {
        if (deleteAct > 0) {
          res
            .status(200)
            .json({ message: `successfully deleted action id ${id}` });
        } else {
          res
            .status(404)
            .json({ message: `action with id ${id} does not exist.` });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  });

module.exports = router;
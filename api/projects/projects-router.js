// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();

//GET PROJECTS

router.get('/', (req, res) => {
    Projects
        .get()
        .then(projects => {
            res
                .status(200)
                .json(projects);
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({message: 'error retrieving projects'});
        })
})

router.get("/:id", (req, res) => {
    const { id } = req.params;

    Projects.get(id)
    .then(project => {
        if(!project){
            res.status(404).json({ message: `post with id ${id} does not exist.` })
        } else {
            res.status(200).json(project)
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

//POST PROJECTS

router.post("/", (req, res) => {

    if(!req.body.name || !req.body.description){
        res.status(400).json({ message: "missing required info, either name or description."})
    } else {
        Projects.insert(req.body)
        .then(newProj => {
            res.status(201).json(newProj)
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
    }
})

//PUT PROJECTS

router.put("/:id", (req, res) => {
    const { id } = req.params;

    if(!req.body.name || !req.body.description){
        res.status(400).json({ message: "req.body missing either name or description to be updated."})
    } else{
        Projects.update(id, req.body)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
    }

})

//DELETE PROJECTS

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Projects.remove(id)
    .then(delProj => {
        if(delProj > 0) {
            res.status(200).json({ message: `successfully deleted post id ${id}`})
        } else {
            res.status(404).json({ message: `post with id ${id} does not exist.` })
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

//GET PROJECTS ACTIONS

router.get("/:id/actions", (req, res) => {
    const { id } = req.params;

    Projects.getProjectActions(id)
    .then(projAct => {
        res.status(200).json(projAct)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

module.exports = router;
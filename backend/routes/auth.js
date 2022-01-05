const express = require("express")
const app = express()
const passport = require("../config/passport")
const fs = require("fs")
const users = require("../users.json")

const path = "./users.json"

app.get('/signup', (req, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.status(500).send("Internal server error")
        }

        const messages = JSON.parse(data)
        res.json(messages)
    })
})



app.post('/signup', (req, res) => {

const {email, username} = req.body

const emailVerification = users.find(user => user.email === email)
const usernameVerification = users.find(user => user.username === username )

    if (!emailVerification || !usernameVerification) {
        const allIds = users.map(user => user.id)
        const biggestId = Math.max(...allIds)
        
        const message = {
            id : biggestId + 1,
            ...req.body
        }

        fs.readFile(path, (err, data) => {
            if (err) {
                console.log("error", err)
                res.status("500").send("Interval server error");
            }

            let messages = JSON.parse(data)
            messages = [...messages, message]

            fs.writeFile(path, JSON.stringify(messages), (err) => {
                if (err) {
                    res.status(500).send("Interval server error")
                }
            })
        })

        res.json(message)
    } else {
        res.status(409).send("Username or Email already exists")
    }


})

app.post('/login', passport.authenticate("local"), (req, res) => {
    if (req.user) {
        req.logIn(req.user, (err) => {
            if (err) {
                res.status(500).send("An error occured")
            }

            res.json(req.user)
        })
    }
})

app.post('/signup', passport.authenticate("local"), (req, res) => {
    console.log(req.user);
    if (req.user) {
        req.logIn(req.user, (err) => {
            if (err) {
                res.status(500).send("An error occured")
            }

            res.json(req.user)
        })
    }
})

module.exports = app
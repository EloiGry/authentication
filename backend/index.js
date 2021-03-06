const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const port = 5000
const session = require("express-session")
const passport = require("./config/passport")
const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin")


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))

app.use(express.json())
app.use(morgan('tiny'))

app.use(session({
    secret : "secret",
    resave: true,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", authRoutes)
app.use("/admin", adminRoutes)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
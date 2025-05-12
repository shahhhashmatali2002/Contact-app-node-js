import express from 'express'
import { connectDB } from './config/database.js'
import ContactRoutes from './routes/contact-routes.js'

const app = express()
const PORT = process.env.PORT


// Database Connection 
connectDB()

// Middleware 
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

// Routes
app.use(ContactRoutes)




app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})
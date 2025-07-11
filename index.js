require('dotenv').config({ path: require('path').resolve(__dirname, '.env') })
const express = require('express')
const app = express()
const cors = require('cors')
const auth_route = require('./routers/auth-route')
const service_route = require('./routers/service-route')
const contact_route = require('./routers/contact-route')
const admin_route = require('./routers/admin-route')
const connectDB = require('./Utils/db')
const errorMiddleware = require('./Middlewares/error-middleware')


const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH'],
    credentials: true
}
app.use(cors(corsOptions))
app.use(express.json())

app.use('/uploads', express.static('uploads'))
app.use('/api/auth', auth_route)
app.use('/api/services', service_route)
app.use('/api/form', contact_route)
app.use('/api/admin', admin_route)



app.use(errorMiddleware)


const port = process.env.PORT;
const startServer = async () => {
    console.log('🟡 Reaching before connectDB...');
    await connectDB()
    app.listen(port, () => {
        console.log(`✅ Server is Running On port ${port}`);
    })
}

startServer();
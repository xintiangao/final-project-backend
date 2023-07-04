import express from "express"
import cors from 'cors'
import userRouter from "./src/controllers/users.controllers.js"
import authRouter from "./src/controllers/auth.controllers.js"
import incomeInputRouter from "./src/controllers/income-input.controllers.js"
import expenseInputRouter from "./src/controllers/expense-input.controllers.js"
// import prisma from "./src/utils/prisma.js"

const app = express()

app.use(express.json());
app.use(cors());

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/income-input', incomeInputRouter)
app.use('/expense-input', expenseInputRouter)


export default app
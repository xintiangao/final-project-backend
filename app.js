import express from "express"
import cors from 'cors'
import userRouter from "./src/controllers/users.controllers.js"
import authRouter from "./src/controllers/auth.controllers.js"
import incomeInputRouter from "./src/controllers/income-input.controllers.js"
import expenseInputRouter from "./src/controllers/expense-input.controllers.js"
import calculationRecordRouter from "./src/controllers/calculation-record.controllers.js"
import setGoalRouter from "./src/controllers/set-goal.controllers.js"
import communityRouter from "./src/controllers/community.controllers.js"
import bankRouter from "./src/controllers/bank.controllers.js"
import CashBackRouter from "./src/controllers/cashback.controllers.js"

const app = express()

app.use(express.json());
app.use(cors());

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/income-input', incomeInputRouter)
app.use('/expense-input', expenseInputRouter)
app.use('/calculation-record', calculationRecordRouter)
app.use('/set-goal', setGoalRouter)
app.use('/community', communityRouter)
app.use('/bank', bankRouter)
app.use('/cashBack', CashBackRouter)

export default app
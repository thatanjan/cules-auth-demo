import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8000

app.get('/hello', (_, res) => res.send('This is Cules Coding'))

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))

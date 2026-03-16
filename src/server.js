const express = require("express")

const app = express()

// permite receber JSON grande (CT-e vem grande em base64)
app.use(express.json({ limit: "10mb" }))

// rota de teste
app.get("/", (req, res) => {
    res.send("API Webhook funcionando")
})

// rota para webhook
app.post("/webhook/cte", (req, res) => {

    console.log("Webhook recebido")

    console.log(req.body)

    res.status(200).json({
        status: "recebido"
    })
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
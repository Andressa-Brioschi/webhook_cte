const express = require("express")

const app = express()

function formatarData() {
    const agora = new Date()

    const dia = String(agora.getDate()).padStart(2, "0")
    const mes = String(agora.getMonth() + 1).padStart(2, "0")
    const ano = agora.getFullYear()
    const hora = String(agora.getHours()).padStart(2, "0")
    const min = String(agora.getMinutes()).padStart(2, "0")
    const seg = String(agora.getSeconds()).padStart(2, "0")

    return `${dia}-${mes}-${ano} ${hora}:${min}:${seg}`
}

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

    try {
        // aqui você pode processar o XML base64 depois

        const resposta = [
            {
                retorno: {
                    codigo: 200,
                    descricao: "ENVIO PROCESSADO COM SUCESSO",
                    dataHora: formatarData()
                }
            }
        ]

        res.status(200).json(resposta)

    } catch (error) {
        console.error(error)

        const respostaErro = [
            {
                retorno: {
                    codigo: 400,
                    descricao: "NAO FOI POSSIVEL PROCESSAR A REQUISICAO",
                    dataHora: new Date().toLocaleString("pt-BR")
                }
            }
        ]

        res.status(400).json(respostaErro)
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

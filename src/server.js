const express = require("express")

const app = express()

// contador de protocolo
let protocoloAtual = require("crypto")

// permite receber JSON grande
app.use(express.json({ limit: "10mb" }))

// função para formatar data
function formatarDataHora(data) {
    const dia = String(data.getDate()).padStart(2, "0")
    const mes = String(data.getMonth() + 1).padStart(2, "0")
    const ano = data.getFullYear()

    const hora = String(data.getHours()).padStart(2, "0")
    const minuto = String(data.getMinutes()).padStart(2, "0")
    const segundo = String(data.getSeconds()).padStart(2, "0")

    return `${dia}-${mes}-${ano} ${hora}:${minuto}:${segundo}`
}

// rota de teste
app.get("/", (req, res) => {
    res.send("API Webhook funcionando")
})

// rota webhook
app.post("/webhook/cte", (req, res) => {

    try {

        console.log("Webhook recebido")

        console.log(req.body)

        const resposta = [
            {
                retorno: {
                    codigo: 200,
                    descricao: "OCORRENCIA PROCESSADA COM SUCESSO",
                    dataHora: formatarDataHora(new Date()),
                    protocolo: protocoloAtual.randomUUID()
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
                    dataHora: formatarDataHora(new Date()),
                    protocolo: protocoloAtual.randomUUID()
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

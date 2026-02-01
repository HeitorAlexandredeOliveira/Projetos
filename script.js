const message = document.getElementById("message");
const input = document.getElementById("input");
const button = document.getElementById("actionButton");

let step = 1;
let userName = "";

// URL do Google Apps Script (Web App)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxeP4MTBpVOgOCltvrFAuc3X4B1zGMTupTQZNhVI_L38-d5MmxSq_XxwgwW0s-NoRoviA/exec";

button.addEventListener("click", () => {

    // ETAPA 1 — Coleta do nome
    if (step === 1) {
        userName = input.value.trim();

        if (!userName) {
            message.innerText = "O xerife precisa de um nome para continuar.";
            return;
        }

        const normalized = userName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

        if (normalized === "mirelly") {
            message.innerText =
                "Então é você mesmo...\nFinalmente encontrei quem estava procurando.";
        } else {
            message.innerText =
                "Interessante...\nToda boa história começa com uma conversa.";
        }

        input.value = "";
        input.placeholder = "Seu telefone";
        step = 2;
        return;
    }

    // ETAPA 2 — Coleta do telefone
    if (step === 2) {
        const phone = input.value.trim();

        if (!phone) {
            message.innerText = "O xerife ainda aguarda um número de contato.";
            return;
        }

        sendData(userName, phone);

        message.innerText =
            "Aviso recebido.\nO xerife já está a caminho.";

        input.style.display = "none";
        button.style.display = "none";
        step = 3;
    }
});

// Envio dos dados para o Google Apps Script
function sendData(name, phone) {
    fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
            name: name,
            phone: phone
        })
    }).catch(() => {});
}



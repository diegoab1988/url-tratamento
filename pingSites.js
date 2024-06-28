const ping = require('ping');

// Função para verificar o status do site
async function checkSiteStatus(website) {
  try {
    const res = await ping.promise.probe(website);
    if (res.alive) {
      const ip = res.numeric_host;
      const status = ip === "200.142.158.30" ? "Bloqueado" : "Acessível";
      const color = ip === "200.142.158.30" ? "Red" : "Green";
      return { site: website, ip, status, color };
    } else {
      return { site: website, ip: null, status: "Não acessível", color: "Yellow" };
    }
  } catch (error) {
    console.error(`Erro ao acessar o site ${website}: ${error.message}`);
    return { site: website, ip: null, status: "Erro", color: "Yellow" };
  }
}

module.exports = { checkSiteStatus };

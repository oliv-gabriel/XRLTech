const ftp = require("basic-ftp");
require("dotenv").config({ path: ".env" });
const { Readable } = require("stream");

async function run() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    console.log("Conectando ao FTP...");
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false
    });
    
    console.log("Tentando entrar em 'imagens'...");
    await client.cd("imagens");
    console.log("Entrou em 'imagens' com sucesso!");
    
    console.log("Fazendo upload de teste...");
    const buffer = Buffer.from("teste de arquivo");
    const stream = Readable.from(buffer);
    await client.uploadFrom(stream, "teste.txt");
    console.log("Upload feito com sucesso!");

  } catch (err) {
    console.log("ERRO NO FTP:", err);
  }
  client.close();
}

run();

const ftp = require("basic-ftp");
require("dotenv").config({ path: ".env" });

async function run() {
  const client = new ftp.Client();
  try {
    console.log("Conectando ao FTP...");
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false
    });
    
    const pwd = await client.pwd();
    console.log("DIRETÓRIO ATUAL:", pwd);
    
    const list = await client.list();
    console.log("PASTAS/ARQUIVOS AQUI:");
    list.forEach(item => console.log(`- ${item.name} (${item.isDirectory ? 'DIR' : 'FILE'})`));

  } catch (err) {
    console.log("ERRO NO FTP:", err);
  }
  client.close();
}

run();

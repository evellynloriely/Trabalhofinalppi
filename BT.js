import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const porta = 3000;
const host = '0.0.0.0';
const usuarios = [];
const message = [];
const bt = express();
bt.use(cookieParser());
bt.use(session({ secret: 'sua-chave-secreta-aqui', resave: true, saveUninitialized: true }));

bt.get('/', (pega, passa) =>{
    const RESPOSTA = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BATE-PAPO</title>
    </head>
    <body>
        <a href="/login.html">CLIQUE AQUI PARA LOGAR NO SISTEMA</a>
    </body>`;
    passa.send(RESPOSTA);

})
bt.get('/login.html', (pega, passa) => {
    passa.sendFile(path.join(process.cwd(), '/login.html'));
  });
bt.get('/login.html', (pega, passa) =>{
    let usuario = pega.body.nome;
    let senha = pega.body.senha
    if (!usuario === 'EvellynLoriely' && !senha === '26112004') {
    passa.send('Senha ou Usuario invalido. <a href="/login.html">Volte ao login</a>.');
  } else {
    pega.session.usuarios = nome;
    const hora = new Date().toLocaleString();
    passa.redirect('/menu.html');
  }
});
bt.get('/menu.html', (pega, passa) => {
    passa.sendFile(path.join(process.cwd(), 'menu.html'));
} );

bt.get('/cadastrarusuario', (pega, passa) => {
    passa.sendFile(path.join(process.cwd(), 'cadastrarusuario'));
});

bt.post('/cadastro.html', (pega, passa) => {
    const { nome, apelido, data } = pega.body;
    if (nome || apelido || data) {

    const nova = {
        nome: nome,
        apelido: apelido,
        data: data
    };
    usuarios.push(nova);
    let tabeladeusuarios = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            
        </head>
        <body>
            <h2>Usuário cadastrado</h2>
            <table>
                <tr>
                    <th>Nome</th>
                    <th>apelido</th>
                    <th>Nascimento</th>
                </tr>`;
    for (const pessoa of usuarios) {
        tabelaResposta += `
            <tr>
                <td>${pessoa.nome}</td>
                <td>${pessoa.apelido}</td>
                <td>${pessoa.data}</td>
            </tr>`;
    }
    tabeladeusuarios += `
            </table>
            <br>
            <a href="/menu">Voltar para o Menu</a>
        </body>
        </html>
     `;}
    passa.header('Content-Type', 'text/html');
    passa.send(tabeladeusuarios);
});

bt.get('/usuarios', (pega, passa) => {
    passa.json({ usuarios: usuarios });
});

bt.get('/chat',(pega, passa) => {
    passa.sendFile(path.join(process.cwd(), 'chat'));
});

bt.post('/enviar',(pega, passa) => {
    const { usuario, mensagem } = pega.body;
    if (!usuario || !mensagem) {
        return passa.redirect('/chat');
    }
    const dataH = new Date().toLocaleString();
    const mensagens = {
        usuario: usuario,
        mensagem: mensagem,
        dataH: dataH,
    };
    message.push(mensagens);
});

bt.get('/message',(pega, passa) => {
    passa.json({ message: message });
});

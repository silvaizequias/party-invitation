**DESCRIÇÃO GERAL**

Este serviço foi criado suando o NextJS na sua última versão (13.5.4).
O frontend está usando a biblioteca MUI (Material UI) para a sua interface.

O backend foi criado usando o próprio NextJS, contendo as rotas de usuário e autenticação.

> DEPENDÊNCIAS ESSENCIAIS

Nesse projeto está sendo utilizada dentre outras, algumas dependências essenciais:
- Axios: usado nas requisições de API;
- React Hook Form: usado para manipular os inputs dos formulários;
- Zod: usado para criar os schemas de submissão e validação de formulário e também para validação nos endpoints de POST e PATCH;
- Reack Hot Toast: usado para mostrar avisos em tela;

> A APLICAÇÃO JD FORM

Ao acessar a aplicação através do navegador pela URL http://localhost:3000 deve ser possível visualizar a tela inicial da aplicação, contendo um formulário onde a proposta inicial é confirmar a presençã dos convidados em um evento.

A confirmação é feita através de submissão dos seguintes dados: nome completo, e-mail, cpf, cor favorita e uma breve observação.
Assim que o usuário submete o formulário, ele é avisado de que sua presença foi confirmada.
A tela muda para um cartão exibindo uma mensagem com o nome e a cor que o usuário (convidado) escolheu para o evento.

Esse ambiente após submissão é uma sessão criada para validar a submissão e levar o usuário para o seu próprio ambiente, onde é exibido o cartão.
O usuário só possui a opção do botão de sair da sessão, onde retorna para a tela do formulário principal.

Caso o usuário tente submeter o formulário com o mesmo e-mail e cpf ele é avisado de que isso não é possível.

O usuário que já confirmou presença no evento também pode através do botão "Já confirmei presença" iniciar uma nova sessão com seu e-mail e cpf, onde é exibido o cartão da cor que escolheu na submissão do formulário.

Através do botão "Já confirmei presença" o usuário com a função de "administrator" (Administrador - Anfitrião do Evento), pode iniciar sua sessão com as seguintes informações: email: **admin@email.com** e CPF: **00000000000** .

Na sessão do Anfitrião, ele consegue adicionar novos usuários a lista, editar e remover os mesmos.

Para o primeiro acesso, após iniciar a aplicação, poderá acessar (pode ser no postman com GET ou no browser) http://localhost:3000/api/setup para criar o usuário Anfitrião

> MELHORIAS:

- Testes E2E: foi realizada a configuração inicial do cypress e implementado apenas um teste básico de acesso e conteúdo da tela inicial
- SWR: pode ser usado o motation assim que submetido o formulário para que a tela já carregue as informções instantaneamente (isso pode ser melhor refletido apenas na sessão de administrator)
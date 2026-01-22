/*********************************
 * DADOS INICIAIS
 *********************************/
let usuarios = JSON.parse(localStorage.getItem("usuarios"));

if (!usuarios) {
  usuarios = [
    {
      nome: "Admin",
      email: "admin@fit.com",
      senha: "1235",
      tipo: "admin",
      status: "ativo"
    }
  ];
  salvarUsuarios();
}

function salvarUsuarios() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

/*********************************
 * LOGIN
 *********************************/
function login() {
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;
  const erro = document.getElementById("erro");

  const usuario = usuarios.find(
    u => u.email === email && u.senha === senha && u.status === "ativo"
  );

  if (!usuario) {
    erro.innerText = "Email ou senha inválidos";
    return;
  }

  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

  location.href = usuario.tipo === "admin" ? "admin.html" : "aluno.html";
}

/*********************************
 * PROTEÇÃO DE ROTAS
 *********************************/
function proteger(tipo) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuario || usuario.tipo !== tipo) {
    location.href = "login.html";
  }
}

/*********************************
 * LOGOUT
 *********************************/
function logout() {
  localStorage.removeItem("usuarioLogado");
  location.href = "login.html";
}

/*********************************
 * ADMIN – CRIAR ALUNO
 *********************************/
function criarAluno() {
  const nome = document.getElementById("nomeAluno").value;
  const email = document.getElementById("emailAluno").value;
  const senha = document.getElementById("senhaAluno").value;
  const plano = document.getElementById("planoAluno").value;

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  const existe = usuarios.find(u => u.email === email);
  if (existe) {
    alert("Aluno já cadastrado");
    return;
  }

  usuarios.push({
    nome,
    email,
    senha,
    plano,
    tipo: "aluno",
    status: "ativo"
  });

  salvarUsuarios();
  carregarDashboard();
  alert("Aluno criado com sucesso!");
}

/*********************************
 * ADMIN – DASHBOARD
 *********************************/
function carregarDashboard() {
  const alunos = usuarios.filter(u => u.tipo === "aluno");

  document.getElementById("totalAlunos").innerText = alunos.length;
  document.getElementById("ativos").innerText =
    alunos.filter(a => a.status === "ativo").length;

  document.getElementById("bloqueados").innerText =
    alunos.filter(a => a.status === "bloqueado").length;

  carregarListaAlunos(alunos);
}

/*********************************
 * ADMIN – LISTA DE ALUNOS
 *********************************/
function carregarListaAlunos(alunos) {
  const tabela = document.getElementById("listaAlunos");
  if (!tabela) return;

  tabela.innerHTML = "";

  alunos.forEach(aluno => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.email}</td>
      <td>${aluno.plano}</td>
      <td>${aluno.status}</td>
    `;
    tabela.appendChild(tr);
  });
}

/*********************************
 * ADMIN – TREINO E AGENDA
 *********************************/
function salvarTreino() {
  const email = document.getElementById("emailTreino").value;
  const treino = document.getElementById("treinoTexto").value;

  localStorage.setItem("treino_" + email, treino);
  alert("Treino salvo!");
}

function salvarAgenda() {
  const agenda = document.getElementById("agendaTexto").value;
  localStorage.setItem("agenda_geral", agenda);
  alert("Agenda salva!");
}

/*********************************
 * ALUNO – PORTAL
 *********************************/
function carregarAluno() {
  const aluno = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!aluno) return;

  document.getElementById("alunoNome").innerText = aluno.nome;
  document.getElementById("alunoPlano").innerText = "Plano: " + aluno.plano;

  document.getElementById("treinoAluno").innerText =
    localStorage.getItem("treino_" + aluno.email) || "Treino ainda não definido";

  document.getElementById("agendaAluno").innerText =
    localStorage.getItem("agenda_geral") || "Agenda não disponível";
}

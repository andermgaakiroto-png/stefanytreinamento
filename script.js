// USUÁRIOS INICIAIS
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
  {
    nome: "Admin",
    email: "admin@fit.com",
    senha: "1235",
    tipo: "admin",
    status: "ativo"
  }
];

function salvarUsuarios() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// LOGIN
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

  if (usuario.tipo === "admin") {
    location.href = "admin.html";
  } else {
    location.href = "aluno.html";
  }
}

// PROTEÇÃO
function proteger(tipo) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuario || usuario.tipo !== tipo) {
    location.href = "login.html";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("usuarioLogado");
  location.href = "login.html";
}

// ===== ADMIN =====
function criarAluno() {
  const nome = document.getElementById("nomeAluno").value;
  const email = document.getElementById("emailAluno").value;
  const senha = document.getElementById("senhaAluno").value;
  const plano = document.getElementById("planoAluno").value;

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos");
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
  alert("Aluno criado com sucesso!");
}

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

function carregarDashboard() {
  document.getElementById("totalUsuarios").innerText = usuarios.length;
  document.getElementById("ativos").innerText =
    usuarios.filter(u => u.status === "ativo" && u.tipo === "aluno").length;
  document.getElementById("bloqueados").innerText =
    usuarios.filter(u => u.status === "bloqueado").length;
}

// ===== ALUNO =====
function carregarAluno() {
  const aluno = JSON.parse(localStorage.getItem("usuarioLogado"));

  document.getElementById("alunoNome").innerText = aluno.nome;
  document.getElementById("alunoPlano").innerText = "Plano: " + aluno.plano;

  document.getElementById("treinoAluno").innerText =
    localStorage.getItem("treino_" + aluno.email) || "Treino ainda não definido";

  document.getElementById("agendaAluno").innerText =
    localStorage.getItem("agenda_geral") || "Agenda não disponível";
}
function criarAluno() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

  alunos.push({
    nome,
    email,
    senha,
    status: "ativo",
    plano: "online"
  });

  localStorage.setItem("alunos", JSON.stringify(alunos));
  alert("Aluno criado com sucesso!");
}
function carregarDashboard(){
  const alunos = usuarios.filter(u => u.tipo === "aluno");

  document.getElementById("totalAlunos").innerText = alunos.length;
  document.getElementById("ativos").innerText =
    alunos.filter(a => a.status === "ativo").length;

  document.getElementById("bloqueados").innerText =
    alunos.filter(a => a.status === "bloqueado").length;
}
function carregarDashboard(){
  const alunos = usuarios.filter(u => u.tipo === "aluno");

  document.getElementById("totalAlunos").innerText = alunos.length;
  document.getElementById("ativos").innerText =
    alunos.filter(a => a.status === "ativo").length;

  document.getElementById("bloqueados").innerText =
    alunos.filter(a => a.status === "bloqueado").length;
}
function criarAluno(){
  const nome = document.getElementById("nomeAluno").value;
  const email = document.getElementById("emailAluno").value;
  const senha = document.getElementById("senhaAluno").value;
  const plano = document.getElementById("planoAluno").value;

  if(!nome || !email || !senha){
    alert("Preencha todos os campos");
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

  salvar();
  carregarDashboard();
  alert("Aluno criado com sucesso!");
}

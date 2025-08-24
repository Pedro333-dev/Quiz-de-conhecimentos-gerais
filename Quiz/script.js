// Seleção de todas as questões e botões
const questão1 = document.querySelector(".question1");
const questão2 = document.querySelector(".question2");
const questão3 = document.querySelector(".question3");
const questão4 = document.querySelector(".question4");
const questão5 = document.querySelector(".question5");
const questão6 = document.querySelector(".question6");
const questão7 = document.querySelector(".question7");
const questão8 = document.querySelector(".question8");
const questão9 = document.querySelector(".question9");
const questão10 = document.querySelector(".question10");

const botoes1 = document.querySelector(".buttons1");
const botoes2 = document.querySelector(".buttons2");
const botoes3 = document.querySelector(".buttons3");
const botoes4 = document.querySelector(".buttons4");
const botoes5 = document.querySelector(".buttons5");
const botoes6 = document.querySelector(".buttons6");
const botoes7 = document.querySelector(".buttons7");
const botoes8 = document.querySelector(".buttons8");
const botoes9 = document.querySelector(".buttons9");
const botoes10 = document.querySelector(".buttons10");

const finalMenu = document.querySelector(".final-menu");
let score = 0;
let respondido = false;

// Arrays para manipulação
const questoes = [
  questão1,
  questão2,
  questão3,
  questão4,
  questão5,
  questão6,
  questão7,
  questão8,
  questão9,
  questão10,
];
const botoes = [
  botoes1,
  botoes2,
  botoes3,
  botoes4,
  botoes5,
  botoes6,
  botoes7,
  botoes8,
  botoes9,
  botoes10,
];

// Função para iniciar o quiz
function start() {
  questoes.forEach((q) => (q.style.display = "none"));
  questoes[0].style.display = "flex";
  score = 0;
  respondido = false;
}

// Função de clique nas alternativas
function handleClick(i, e) {
  if (respondido) return;
  respondido = true;

  const btn = e.currentTarget; // garante que é o botão, mesmo clicando no span
  const botoesDaQuestao = Array.from(botoes[i].children);

  // Marca acerto/erro
  if (btn.classList.contains("btn-certo")) {
    score++;
    btn.classList.add("acertou");
  } else {
    btn.classList.add("errou");
    const correto = botoesDaQuestao.find((b) =>
      b.classList.contains("btn-certo")
    );
    correto.classList.add("acertou");
  }

  // Troca de questão após 2 segundos
  setTimeout(() => {
    questoes[i].style.display = "none";

    if (i + 1 < questoes.length) {
      questoes[i + 1].style.display = "flex";
      respondido = false;

      botoes[i + 1]
        .querySelectorAll("button")
        .forEach((b) => b.classList.remove("acertou", "errou"));
    } else {
      finalMenu.style.display = "flex";
      finalMenu.querySelector(
        "p"
      ).textContent = `Você acertou ${score}/10 perguntas!`;
    }
  }, 2000);
}

// Adiciona evento de clique a todos os botões
botoes.forEach((grupo, i) => {
  Array.from(grupo.children).forEach((btn) => {
    btn.addEventListener("click", (e) => handleClick(i, e));
  });
});

// Botão iniciar
document.querySelector(".btn-start").addEventListener("click", start);

// Botão reiniciar
document.querySelector(".btn-restart").addEventListener("click", () => {
  finalMenu.style.display = "none";
  questoes.forEach((q) => (q.style.display = "none"));
  botoes.forEach((grupo) =>
    grupo
      .querySelectorAll("button")
      .forEach((b) => b.classList.remove("acertou", "errou"))
  );
  score = 0;
  respondido = false;
  start();
});

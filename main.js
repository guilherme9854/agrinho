const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Remove active de todos os botões e conteúdos
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    // Ativa o botão clicado e o conteúdo correspondente
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});
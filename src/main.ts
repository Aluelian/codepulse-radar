import "./styles.css";
import { getGitHubRepos, getGitHubUser } from "./api";
import { revealOnScroll } from "./motion.js";
import {
  aggregateLanguages,
  clearStatus,
  renderLanguages,
  renderProfile,
  renderRepos,
  renderStatus
} from "./ui";

function requireElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Elemento nao encontrado: ${selector}`);
  }
  return element;
}

const form = requireElement<HTMLFormElement>("#search-form");
const usernameInput = requireElement<HTMLInputElement>("#username");
const statusEl = requireElement<HTMLElement>("#status");
const profileEl = requireElement<HTMLElement>("#profile");
const languagesEl = requireElement<HTMLElement>("#languages");
const reposEl = requireElement<HTMLElement>("#repos");

const savedUsername = localStorage.getItem("radar-dev:last-username");
if (savedUsername) {
  usernameInput.value = savedUsername;
}

async function runSearch(username: string) {
  renderStatus(statusEl, "Consultando API do GitHub...", "loading");

  try {
    const [user, repos] = await Promise.all([getGitHubUser(username), getGitHubRepos(username)]);
    const languageStats = aggregateLanguages(repos);

    renderProfile(profileEl, user);
    renderLanguages(languagesEl, languageStats);
    renderRepos(reposEl, repos);
    clearStatus(statusEl);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado ao buscar dados.";
    renderStatus(statusEl, message, "error");
    profileEl.innerHTML = "";
    languagesEl.innerHTML = "";
    reposEl.innerHTML = "";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = usernameInput.value.trim();

  if (!username) {
    renderStatus(statusEl, "Digite um usuario valido.", "error");
    return;
  }

  localStorage.setItem("radar-dev:last-username", username);
  await runSearch(username);
});

revealOnScroll();

if (savedUsername) {
  runSearch(savedUsername);
}

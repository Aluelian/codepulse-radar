import "./mobile.css";
import { getGitHubRepos, getGitHubUser } from "./api";
import { revealOnScroll } from "./motion.js";
import {
  aggregateLanguages,
  clearStatus,
  renderLanguages,
  renderLoadingState,
  renderProfile,
  renderRepos,
  renderSearchHistory,
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
const historyEl = requireElement<HTMLElement>("#search-history");

const LAST_USERNAME_KEY = "codepulse:last-username";
const HISTORY_KEY = "codepulse:history";

function readHistory(): string[] {
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed.filter(Boolean).slice(0, 8) : [];
  } catch {
    return [];
  }
}

function saveHistory(username: string) {
  const next = [username, ...readHistory().filter((item) => item.toLowerCase() !== username.toLowerCase())].slice(0, 8);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  renderSearchHistory(historyEl, next);
}

function refreshHistory() {
  renderSearchHistory(historyEl, readHistory());
}

const savedUsername = localStorage.getItem(LAST_USERNAME_KEY);
if (savedUsername) {
  usernameInput.value = savedUsername;
}

async function runSearch(username: string) {
  renderStatus(statusEl, "Analisando perfil...", "loading");
  renderLoadingState(profileEl, languagesEl, reposEl);

  try {
    const [user, repos] = await Promise.all([getGitHubUser(username), getGitHubRepos(username)]);
    const languageStats = aggregateLanguages(repos);
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    renderProfile(profileEl, user, totalStars);
    renderLanguages(languagesEl, languageStats);
    renderRepos(reposEl, repos);
    clearStatus(statusEl);
    localStorage.setItem(LAST_USERNAME_KEY, username);
    saveHistory(username);
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

  await runSearch(username);
});

historyEl.addEventListener("click", async (event) => {
  const target = event.target as HTMLElement;
  const button = target.closest("[data-history-user]") as HTMLButtonElement | null;

  if (!button) {
    return;
  }

  const username = button.dataset.historyUser;
  if (!username) {
    return;
  }

  usernameInput.value = username;
  await runSearch(username);
});

revealOnScroll();
refreshHistory();

if (savedUsername) {
  runSearch(savedUsername);
}
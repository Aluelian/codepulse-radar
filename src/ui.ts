import type { GitHubRepo, GitHubUser, LanguageStat } from "./types";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function relativeDate(dateIso: string): string {
  const now = Date.now();
  const date = new Date(dateIso).getTime();
  const days = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (days <= 0) {
    return "hoje";
  }

  if (days === 1) {
    return "1 dia atras";
  }

  return `${days} dias atras`;
}

export function aggregateLanguages(repos: GitHubRepo[]): LanguageStat[] {
  const languageMap = new Map<string, number>();

  repos.forEach((repo) => {
    const language = repo.language ?? "Nao informado";
    languageMap.set(language, (languageMap.get(language) ?? 0) + 1);
  });

  const total = repos.length || 1;

  return [...languageMap.entries()]
    .map(([language, count]) => ({
      language,
      count,
      share: Number(((count / total) * 100).toFixed(1))
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

export function renderStatus(target: HTMLElement, message: string, kind: "loading" | "error" | "neutral") {
  target.className = `status ${kind}`;
  target.textContent = message;
}

export function clearStatus(target: HTMLElement) {
  target.className = "status";
  target.textContent = "";
}

export function renderProfile(target: HTMLElement, user: GitHubUser) {
  target.innerHTML = `
    <h2 id="profile-title">Perfil</h2>
    <div class="profile-head">
      <img src="${user.avatar_url}" alt="Avatar de ${user.login}" class="avatar" />
      <div>
        <p class="username">@${user.login}</p>
        <h3>${user.name ?? "Sem nome publico"}</h3>
        <p>${user.bio ?? "Sem bio cadastrada."}</p>
        <a class="link" href="${user.html_url}" target="_blank" rel="noreferrer">Ver no GitHub</a>
      </div>
    </div>
    <div class="metrics">
      <article>
        <p>Repositorios</p>
        <strong>${formatNumber(user.public_repos)}</strong>
      </article>
      <article>
        <p>Seguidores</p>
        <strong>${formatNumber(user.followers)}</strong>
      </article>
      <article>
        <p>Seguindo</p>
        <strong>${formatNumber(user.following)}</strong>
      </article>
      <article>
        <p>Localizacao</p>
        <strong>${user.location ?? "-"}</strong>
      </article>
    </div>
  `;
}

export function renderLanguages(target: HTMLElement, stats: LanguageStat[]) {
  target.innerHTML = `
    <h2 id="languages-title">Stack mais usada</h2>
    <div class="language-list">
      ${stats
        .map(
          (item) => `
          <article class="language-item">
            <div class="language-row">
              <strong>${item.language}</strong>
              <span>${item.share}%</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" style="width: ${item.share}%"></div>
            </div>
          </article>
        `
        )
        .join("")}
    </div>
  `;
}

export function renderRepos(target: HTMLElement, repos: GitHubRepo[]) {
  const top = repos
    .slice()
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 8);

  target.innerHTML = `
    <div class="repos-head">
      <h2 id="repos-title">Repositorios em destaque</h2>
      <p>Top 8 por estrelas</p>
    </div>
    <div class="repo-list">
      ${top
        .map(
          (repo) => `
          <article class="repo-item">
            <a href="${repo.html_url}" target="_blank" rel="noreferrer">${repo.name}</a>
            <p>${repo.description ?? "Sem descricao."}</p>
            <div class="repo-meta">
              <span>⭐ ${formatNumber(repo.stargazers_count)}</span>
              <span>🍴 ${formatNumber(repo.forks_count)}</span>
              <span>Atualizado ${relativeDate(repo.updated_at)}</span>
            </div>
          </article>
        `
        )
        .join("")}
    </div>
  `;
}

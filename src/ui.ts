import type { GitHubRepo, GitHubUser, LanguageStat } from "./types";

const languagePalette = ["#e4572e", "#2a9d8f", "#f4a261", "#6c5ce7", "#00b894", "#ff7675", "#0984e3", "#fdcb6e"];

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

export function renderLoadingState(profileTarget: HTMLElement, languagesTarget: HTMLElement, reposTarget: HTMLElement) {
  profileTarget.innerHTML = `
    <h2 id="profile-title">Perfil</h2>
    <div class="skeleton-card profile-skeleton">
      <div class="skeleton-avatar"></div>
      <div class="skeleton-content">
        <div class="skeleton-line short"></div>
        <div class="skeleton-line medium"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>
    </div>
  `;

  languagesTarget.innerHTML = `
    <h2 id="languages-title">Stack mais usada</h2>
    <div class="skeleton-chart"></div>
    <div class="skeleton-list">
      <div class="skeleton-line medium"></div>
      <div class="skeleton-line medium"></div>
      <div class="skeleton-line medium"></div>
    </div>
  `;

  reposTarget.innerHTML = `
    <div class="repos-head">
      <h2 id="repos-title">Repositorios em destaque</h2>
      <p>Carregando...</p>
    </div>
    <div class="skeleton-repo-list">
      <div class="skeleton-repo"></div>
      <div class="skeleton-repo"></div>
      <div class="skeleton-repo"></div>
    </div>
  `;
}

export function renderStatus(target: HTMLElement, message: string, kind: "loading" | "error" | "neutral") {
  target.className = `status ${kind}`;
  target.textContent = message;
}

export function clearStatus(target: HTMLElement) {
  target.className = "status";
  target.textContent = "";
}

export function renderProfile(target: HTMLElement, user: GitHubUser, totalStars: number) {
  const location = user.location ?? "Local nao informado";
  const bio = user.bio ?? "Sem bio cadastrada.";
  const site = user.blog && user.blog.trim() ? user.blog : null;

  target.innerHTML = `
    <h2 id="profile-title">Perfil</h2>
    <div class="profile-head">
      <img src="${user.avatar_url}" alt="Avatar de ${user.login}" class="avatar" />
      <div>
        <p class="username">@${user.login}</p>
        <h3>${user.name ?? "Sem nome publico"}</h3>
        <p class="profile-bio">${bio}</p>
        <div class="profile-links">
          <a class="link" href="${user.html_url}" target="_blank" rel="noreferrer">Ver no GitHub</a>
          ${site ? `<a class="link" href="${site.startsWith("http") ? site : `https://${site}`}" target="_blank" rel="noreferrer">Website</a>` : ""}
        </div>
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
        <p>Estrelas</p>
        <strong>${formatNumber(totalStars)}</strong>
      </article>
      <article>
        <p>Localizacao</p>
        <strong>${location}</strong>
      </article>
      <article>
        <p>Perfil</p>
        <strong>${user.login}</strong>
      </article>
    </div>
  `;
}

export function renderLanguages(target: HTMLElement, stats: LanguageStat[]) {
  const gradientParts = stats
    .map((item, index) => `${languagePalette[index % languagePalette.length]} ${index === 0 ? 0 : stats.slice(0, index).reduce((sum, current) => sum + current.share, 0)}% ${stats.slice(0, index + 1).reduce((sum, current) => sum + current.share, 0)}%`)
    .join(", ");

  const chartStyle = stats.length
    ? `background: conic-gradient(${gradientParts});`
    : "background: linear-gradient(135deg, #e4572e, #2a9d8f);";

  target.innerHTML = `
    <h2 id="languages-title">Stack mais usada</h2>
    <div class="language-wrap">
      <div class="language-chart" style="${chartStyle}">
        <div class="language-chart-inner">
          <span>${stats[0]?.share ?? 0}%</span>
        </div>
      </div>
      <div class="language-legend">
        ${stats
          .map(
            (item, index) => `
            <div class="legend-item">
              <span class="legend-dot" style="background: ${languagePalette[index % languagePalette.length]};"></span>
              <span>${item.language}</span>
              <strong>${item.share}%</strong>
            </div>
            `
          )
          .join("")}
      </div>
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

export function renderSearchHistory(target: HTMLElement, usernames: string[]) {
  if (!usernames.length) {
    target.innerHTML = "";
    return;
  }

  target.innerHTML = `
    <div class="history-box">
      <p>Historico</p>
      <div class="history-list">
        ${usernames
          .map(
            (username) => `
              <button type="button" class="history-chip" data-history-user="${username}">
                ${username}
              </button>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

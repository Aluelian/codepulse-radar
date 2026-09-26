import type { GitHubRepo, GitHubUser } from "./types";

const API_BASE = "https://api.github.com";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Usuario nao encontrado no GitHub.");
    }

    if (response.status === 403) {
      throw new Error("Limite de requisicoes da API atingido. Tente novamente em alguns minutos.");
    }

    throw new Error("Falha ao consultar a API do GitHub.");
  }

  return response.json() as Promise<T>;
}

export async function getGitHubUser(username: string): Promise<GitHubUser> {
  return request<GitHubUser>(`/users/${username}`);
}

export async function getGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const repos = await request<GitHubRepo[]>(`/users/${username}/repos?per_page=100&sort=updated`);
  return repos.filter((repo) => !repo.name.toLowerCase().includes(".github"));
}

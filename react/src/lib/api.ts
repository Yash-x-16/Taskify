const BASE_URL = import.meta.env.VITE_API_URL || "";

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function setToken(token: string): void {
  localStorage.setItem("token", token);
}

export function clearToken(): void {
  localStorage.removeItem("token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };
  if (token) {
    headers["token"] = token;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data as T;
}

export interface Todo {
  _id: string;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: string;
  user: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: { userName: string; email: string; profilePicture: string };
}

export const api = {
  signUp: (userName: string, email: string, password: string) =>
    request<AuthResponse>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ userName, email, password }),
    }),

  signIn: (email: string, password: string) =>
    request<AuthResponse>("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getTodos: () => request<{ todos: Todo[] }>("/api/todo"),

  createTodo: (title: string, description: string) =>
    request<{ message: string; todo: Todo }>("/api/todo", {
      method: "POST",
      body: JSON.stringify({ title, description }),
    }),

  updateTodo: (
    todoId: string,
    body: { title?: string; description?: string; isDone?: boolean }
  ) =>
    request<{ message: string; todo: Todo }>(`/api/todo/${todoId}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  deleteTodo: (todoId: string) =>
    request<{ message: string }>(`/api/todo/${todoId}`, {
      method: "DELETE",
    }),
};

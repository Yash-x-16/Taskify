import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, LogOut, Plus, Trash2, X } from "lucide-react";
import { api, type Todo } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

export default function Todos() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  // edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchTodos = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.getTodos();
      setTodos(res.todos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 4) return;
    setCreating(true);
    try {
      const res = await api.createTodo(title.trim(), description.trim());
      setTodos((prev) => [...prev, res.todo]);
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create todo");
    } finally {
      setCreating(false);
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      const res = await api.updateTodo(todo._id, { isDone: !todo.isDone });
      setTodos((prev) => prev.map((t) => (t._id === todo._id ? res.todo : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo");
    }
  };

  const handleDelete = async (todoId: string) => {
    try {
      await api.deleteTodo(todoId);
      setTodos((prev) => prev.filter((t) => t._id !== todoId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
    }
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEdit = async (todoId: string) => {
    if (editTitle.trim().length < 4) return;
    try {
      const res = await api.updateTodo(todoId, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setTodos((prev) => prev.map((t) => (t._id === todoId ? res.todo : t)));
      cancelEdit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const remaining = todos.filter((t) => !t.isDone).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Taskify</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        {/* Add todo form */}
        <form
          onSubmit={handleCreate}
          className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Add a task</h2>
          <div className="space-y-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minLength={4}
              required
              placeholder="Task title (min 4 characters)"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
            />
            <button
              type="submit"
              disabled={creating}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Plus size={16} />
              {creating ? "Adding..." : "Add task"}
            </button>
          </div>
        </form>

        {/* Summary */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Your tasks
          </h2>
          <span className="text-sm text-gray-500">
            {remaining} of {todos.length} remaining
          </span>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <p className="py-8 text-center text-gray-500">Loading tasks...</p>
        ) : todos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center">
            <p className="text-gray-500">No tasks yet. Add one above!</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                {editingId === todo._id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      minLength={4}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={2}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(todo._id)}
                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleToggle(todo)}
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        todo.isDone
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      {todo.isDone && <Check size={12} strokeWidth={3} />}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-medium ${
                          todo.isDone
                            ? "text-gray-400 line-through"
                            : "text-gray-900"
                        }`}
                      >
                        {todo.title}
                      </p>
                      {todo.description && (
                        <p
                          className={`mt-0.5 text-sm ${
                            todo.isDone ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {todo.description}
                        </p>
                      )}
                      <div className="mt-2 flex gap-3">
                        <button
                          onClick={() => startEdit(todo)}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(todo._id)}
                          className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchPosts() {
  const response = await fetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error("No se pudieron obtener los posts.");
  }

  return response.json();
}

export async function createPost(post) {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el post.");
  }

  return response.json();
}

export async function deletePost(postId) {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar el post.");
  }
}

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { Toast } from "../../shared/toast";
import { removePost } from "./postsSlice";

const POSTS_PER_PAGE = 5;

export function PostList() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { error, filter, items, loading } = useSelector((state) => state.posts);

  async function handleDelete(post) {
    const result = await Swal.fire({
      title: "Eliminar post",
      text: `¿Seguro que quieres eliminar "${post.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#b91c1c",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      await dispatch(removePost(post.id)).unwrap();

      Toast.fire({
        icon: "success",
        title: "Post eliminado correctamente",
      });
    }
  }

  const normalizedFilter = filter.trim().toLowerCase();
  const filteredPosts = items.filter((post) =>
    post.name.toLowerCase().includes(normalizedFilter),
  );
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [currentPage, filteredPosts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, items.length]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (loading) {
    return <p className="state-message">Cargando posts...</p>;
  }

  if (error) {
    return <p className="state-message state-message--error">{error}</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.name}</td>
              <td>{post.description}</td>
              <td>
                <button
                  className="button-link"
                  type="button"
                  onClick={() => handleDelete(post)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {filteredPosts.length === 0 && (
            <tr>
              <td className="empty-cell" colSpan="3">
                No hay posts para mostrar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="table-footer">
        <p>
          Mostrando {currentPosts.length} de {filteredPosts.length} posts
          {normalizedFilter && ` filtrados`} · Total: {items.length}
        </p>
        <div className="pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

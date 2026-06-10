import { useDispatch, useSelector } from "react-redux";

import { filterChanged } from "./postsSlice";

export function PostFilter() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.posts.filter);

  return (
    <div className="post-filter">
      <input
        aria-label="Filtrar posts por nombre"
        placeholder="Filtro de Nombre"
        type="search"
        value={filter}
        onChange={(event) => dispatch(filterChanged(event.target.value))}
      />
      <button type="button">Buscar</button>
    </div>
  );
}

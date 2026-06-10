import { useState } from "react";
import { useDispatch } from "react-redux";

import { Toast } from "../../shared/toast";
import { addPost } from "./postsSlice";

export function PostForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const nameError = submitted && !name.trim();
  const descriptionError = submitted && !description.trim();

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);

    if (!name.trim() || !description.trim()) {
      Toast.fire({
        icon: "warning",
        title: "Completa los campos requeridos",
      });
      return;
    }

    await dispatch(
      addPost({
        name: name.trim(),
        description: description.trim(),
      }),
    ).unwrap();

    setName("");
    setDescription("");
    setSubmitted(false);

    Toast.fire({
      icon: "success",
      title: "Post creado correctamente",
    });
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="field-group">
        <input
          aria-invalid={nameError}
          aria-label="Nombre del post"
          className={nameError ? "input-error" : undefined}
          placeholder="Nombre"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {nameError && <span>Ingresa un nombre.</span>}
      </div>
      <div className="field-group">
        <input
          aria-invalid={descriptionError}
          aria-label="Descripción del post"
          className={descriptionError ? "input-error" : undefined}
          placeholder="Descripción"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        {descriptionError && <span>Ingresa una descripción.</span>}
      </div>
      <button type="submit">Crear</button>
    </form>
  );
}

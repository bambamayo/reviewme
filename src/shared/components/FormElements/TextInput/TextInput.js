import React from "react";
import { useField } from "formik";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="input-group__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className={
          meta.touched && meta.error
            ? "input-group__input input-group__input--error"
            : "input-group__input"
        }
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <span className="input-group__error">{meta.error}</span>
      ) : null}
    </>
  );
};

export default TextInput;

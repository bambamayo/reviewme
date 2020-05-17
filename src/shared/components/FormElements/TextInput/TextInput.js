import React from "react";
import { useField } from "formik";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className={meta.touched && meta.error ? `input-error` : null}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <span className="error">{`*${meta.error}`}</span>
      ) : null}
    </>
  );
};

export default TextInput;

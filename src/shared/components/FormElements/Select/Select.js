import React from "react";
import { useField } from "formik";

const CheckBox = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="input-group__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <select
        className={`input-group__input ${
          meta.touched && meta.error ? "input-group__input--error" : null
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <span className="input-group__error">{`*${meta.error}`}</span>
      ) : null}
    </>
  );
};

export default CheckBox;

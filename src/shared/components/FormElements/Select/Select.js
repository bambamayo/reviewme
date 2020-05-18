import React from "react";
import { useField } from "formik";

const CheckBox = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select
        className={meta.touched && meta.error ? "input input-error" : "input"}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <span className="error">{`*${meta.error}`}</span>
      ) : null}
    </>
  );
};

export default CheckBox;

import React, { useCallback, useContext, useState } from "react";

import { FormContext, useFormLogic } from "./context";

const AddItemForm = () => {
  const { value, handleChange, onSubmit } = useFormLogic();

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={value.name}
      />
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={value.email}
      />
      <button type="submit">Add to list</button>
    </form>
  );
};

export default React.memo(AddItemForm);

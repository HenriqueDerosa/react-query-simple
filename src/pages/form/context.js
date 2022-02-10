import React, { useCallback, useContext, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addUser } from "../../services/api";
const formState = {
  name: "",
  email: "",
};

export const FormContext = React.createContext({
  value: formState,
  handleChange: () => {},
});

export const FormContextProvider = ({ children }) => {
  const [value, setValue] = useState(formState);

  const handleChange = useCallback(
    (key, newValue) => {
      setValue({
        ...value,
        [key]: newValue,
      });
    },
    [value]
  );

  const state = useMemo(() => ({ value, handleChange }), [value]);

  return <FormContext.Provider value={state}>{children}</FormContext.Provider>;
};

export const useFormLogic = () => {
  const queryClient = useQueryClient();
  const context = useContext(FormContext);
  const mutation = useMutation(addUser, {
    onSuccess: (response) => {
      queryClient.setQueryData("userList", (state) => ({
        ...state,
        data: [...state.data, response.data],
      }));
    },
  });

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      mutation.mutate({
        name: context.value.name,
        email: context.value.email,
      });
    },
    [mutation, context]
  );

  const handleChange = useCallback(
    (event) => {
      context.handleChange(event.target.name, event.target.value);
    },
    [context]
  );

  return {
    value: context.value,
    onSubmit,
    handleChange,
  };
};

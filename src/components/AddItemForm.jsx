import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addUser } from "../services/api";

const AddItemForm = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
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
        name,
        email,
      });
    },
    [email, mutation, name]
  );

  const handleChange = useCallback((event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    }
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" onChange={handleChange} value={name} />
      <input type="email" name="email" onChange={handleChange} value={email} />
      <button type="submit">Add to list</button>
    </form>
  );
};

export default AddItemForm;

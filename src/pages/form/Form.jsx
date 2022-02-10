import AddItemForm from "./AddItemForm";
import { FormContextProvider } from "./context";

export default () => {
  return (
    <FormContextProvider>
      <AddItemForm />
    </FormContextProvider>
  );
};

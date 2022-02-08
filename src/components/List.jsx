import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getUserList } from "../services/api";

const List = ({ children }) => {
  const { data: list, isLoading, error } = useQuery("userList", getUserList);

  useEffect(() => {
    console.log(list);
  }, [list]);

  if (isLoading) {
    return <p>Aguarde</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div>
      {list.data.map((item) => {
        return <p key={item.id}>{item.name}</p>;
      })}
    </div>
  );
};

export default List;

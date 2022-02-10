import React, { useMemo, useCallback } from "react";
import { useQuery } from "react-query";
import { getUserList } from "../services/api";

const List = () => {
  const { data: list, isLoading, error } = useQuery("userList", getUserList);

  const renderItem = useCallback(
    (item) => <p key={item.id}>{item.name}</p>,
    []
  );
  const renderList = useMemo(() => list?.data?.map(renderItem), [list]);

  if (isLoading) {
    return <p>Aguarde</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return renderList;
};

export default React.memo(List);

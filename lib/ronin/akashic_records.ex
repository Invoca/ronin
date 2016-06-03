defmodule Ronin.AkashicRecords do

  def local_node do
    {:ok, [{local_name, port}]} = :net_adm.names
    :"#{local_name}"
  end

  def remote_nodes do
    Node.list
    |> Enum.map( fn(v) -> [r,_] = String.split(to_string(v), "@") end )
    |> Enum.map( fn(v) -> [first, _] = v; first end )
    |> Enum.map( fn(v) -> :"#{v}" end )
  end

end
defmodule Ronin.AkashicRecords do

  def local_node do
   case :net_adm.names do
     {:ok, [{local_name, _}]} -> :"#{local_name}"
     _ -> :localhost
    end
  end

  def remote_nodes do
    Node.list
    |> Enum.map( fn(v) -> String.split(to_string(v), "@") end )
    |> Enum.map( fn(v) -> [first, _] = v; first end )
    |> Enum.map( fn(v) -> :"#{v}" end )
  end

end
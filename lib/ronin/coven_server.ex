defmodule Ronin.CovenServer do
  alias Ronin.RitualCircleServer
  alias Ronin.AkashicRecords
  
  def start_link do
    coven = Agent.start_link(fn -> loop() end, name: __MODULE__)
    
    register_coven(coven)
  end
  
  def register_coven({:ok, pid}) do
    :global.register_name(AkashicRecords.local_node(), pid)
  end
  
  def register_coven({:error, {_, pid}}) do
    # :global.register_name(AkashicRecords.local_node(), pid)
  end
  
  def send_spell(spell_payload) do
    send_spell_to_server = fn(server) -> :global.whereis_name(server) |> send({:message, spell_payload}) end
    
    Enum.each(
      AkashicRecords.remote_nodes(),
      send_spell_to_server
    )
  end
  
  defp loop do
    receive do
      {:message, spell} ->
        RitualCircleServer.add(spell)
    end
    
    loop()
  end
end
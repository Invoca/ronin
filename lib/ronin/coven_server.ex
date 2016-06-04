defmodule Ronin.CovenServer do
  alias Ronin.RitualCircleServer
  alias Ronin.AkashicRecords
  
  def start_link do
    Agent.start_link(fn -> register_and_listen() end, name: __MODULE__)    
  end
  
  def register_and_listen() do
    coven = spawn(fn -> loop() end)
    :global.register_name(AkashicRecords.local_node(), coven)
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
defmodule Ronin.CovenServer do
  alias Ronin.RitualCircleServer
  alias Ronin.AkashicRecords
  
  def start do
    coven = spawn(
      fn -> loop() end
    )
    
    :global.register_name(AkashicRecords.local_node_name(), coven)
  end
  
  def send_spell(spell_payload) do
    send_spell_to_server = fn(server) -> :global.whereis_name(server) |> send {:message, spell_payload} end
    
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
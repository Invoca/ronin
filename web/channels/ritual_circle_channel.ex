defmodule Ronin.RitualCircleChannel do
  use Ronin.Web, :channel
  
  alias Ronin.RitualCircleServer
  alias Ronin.CovenServer
    
  def join("ritual_circle" <> ritual_circle_id, _params, socket) do
    spells = RitualCircleServer.all()
  
    {:ok, %{ spells: spells }, socket}
  end
  
  def handle_in("new:spell", params, socket) do
    spell_payload = { params["text"], :calendar.local_time() }
    
    CovenServer.send_spell(spell_payload)
    spell = RitualCircleServer.add(spell_payload)
    
    broadcast! socket, "new:spell", spell
    
    {:noreply, socket}
  end
end
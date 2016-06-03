defmodule Ronin.RitualCircleChannel do
  use Ronin.Web, :channel
  
  alias Ronin.RitualCircleServer
    
  def join("ritual_circle" <> ritual_circle_id, _params, socket) do
    spells = RitualCircleServer.all()
  
    {:ok, %{ spells: spells }, socket}
  end
  
  def handle_in("new:spell", params, socket) do
    spell = params["text"]
    
    RitualCircleServer.add(spell)
    
    broadcast! socket, "new:spell", %{
      text: spell
    }
    
    {:noreply, socket}
  end
end
defmodule Ronin.RitualCircleServer do
  def start_link do
    Agent.start_link(fn -> [] end, name: __MODULE__)
  end
  
  def all() do
    Agent.get(__MODULE__, fn spells -> spells end)
  end
  
  def add({text, {_, {hours, minutes, seconds}}}) do
    spell = %{
      text: text,
      timestamp: "#{hours}:#{minutes}:#{seconds}"
    }
    
    Agent.update(__MODULE__, fn spells -> spells ++ [spell] end)
    
    spell
  end
end
defmodule Ronin.RitualCircleServer do
  def start_link do
    Agent.start_link(fn -> [] end, name: __MODULE__)
  end
  
  def all() do
    Agent.get(__MODULE__, fn spells -> spells end)
  end
  
  def add(text) do
    spell = %{
      text: text,
      completed: false
    }
    
    Agent.update(__MODULE__, fn spells -> spells ++ [spell] end)
  end
end
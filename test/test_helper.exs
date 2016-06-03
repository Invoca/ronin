ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Ronin.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Ronin.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Ronin.Repo)


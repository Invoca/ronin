# Ronin

To start your Phoenix app:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: http://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix


## Notes

# Install elixir....
wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb
sudo apt-get update
sudo apt-get install esl-erlang
sudo apt-get install elixir


# Setting up a node for the first time.
sudo service nginx stop
git clone git@github.com:Invoca/ronin.git
cd ronin
mix deps.get
mix ecto.create


# Connections in iex - Success!
iex --name "olaf@10.170.52.171" --cookie milano --erl "-config sys.config" -S mix
iex --name "erik@10.170.118.186" --cookie milano --erl "-config sys.config" -S mix
iex --name "baleog@10.170.31.232" --cookie milano --erl "-config sys.config" -S mix


# Launching servers -- sucess
elixir --name "olaf@10.170.52.171" --cookie 'milano' --erl "-config sys.config" -S mix phoenix.server
elixir --name "erik@10.170.118.186" --cookie 'milano' --erl "-config sys.config" -S mix phoenix.server
elixir --name "baleog@10.170.31.232" --cookie 'milano' --erl "-config sys.config" -S mix phoenix.server



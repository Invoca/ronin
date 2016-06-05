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

# Local demo notes

## Server names
 * staging-ronin-erik http://staging-ronin-erik.ringrevenue.net:4000/
 * staging-ronin-olaf http://staging-ronin-olaf.ringrevenue.net:4000/
 * staging-ronin-baleog http://staging-ronin-baleog.ringrevenue.net:4000/


# Install elixir....
```
wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb
sudo apt-get update
sudo apt-get install esl-erlang
sudo apt-get install elixir
```

# Setting up a node for the first time. -
We are using a git repo running as the root user.
```
  sudo -i
  SSH_AUTH_SOCK=$SSH_AUTH_SOCK service nginx stop
  git clone git@github.com:Invoca/ronin.git
  cd ronin
  mix deps.get
  mix ecto.create
  tmux new -s ronin
```

# Reloading software and restarting a node...
Join the tmux session:
```  
sudo -i
tmux attach -t ronin
```
Stop the currently running process by pressing ctrl-c twice.

Press CTRL-d to exit the tmux session.

Checkout the latest code.
```
SSH_AUTH_SOCK=$SSH_AUTH_SOCK git fetch && git pull
tmux new -s ronin
```

In the new TMUX session, run the launching servers command from below to start the service again. 

Up arrow twice to run the server again.


# Connections in iex
These are the commands to start iex and join the cluster for each of the servers.  Pick the command for the server you are on. 
```
iex --name "olaf@10.170.52.171" --cookie milano --erl "-config sys.config" -S mix
iex --name "erik@10.170.118.186" --cookie milano --erl "-config sys.config" -S mix
iex --name "baleog@10.170.31.232" --cookie milano --erl "-config sys.config" -S mix
```

# Launching servers
These are the commands to run phoenix and join the cluster for each of the servers.  Pick the command for the server you are on. 
```
elixir --name "olaf@10.170.52.171" --cookie 'milano' --erl "-config sys.config" -S mix phoenix.server
elixir --name "erik@10.170.118.186" --cookie 'milano' --erl "-config sys.config" -S mix phoenix.server
elixir --name "baleog@10.170.31.232" --cookie 'milano' --erl "-config sys.config" -S mix phoenix.server
```

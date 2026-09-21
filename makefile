NAME = portfolio

COMPOSE = docker compose
WEBSERVER_IMAGE = isly-webserver:latest
WEBSERVER_DIR = ./webserver-backend/webserver
MINISHELL_IMAGE = isly-minishell:latest
# The sandbox Dockerfile lives in ./minishell-backend/sandbox and creates /opt/minishell.
MINISHELL_DIR = ./minishell-backend/sandbox

.PHONY: all build build-webserver build-minishell up down restart logs ps clean fclean clean-all re

all: up

build: build-webserver build-minishell
	$(COMPOSE) build

build-webserver:
	docker build -t $(WEBSERVER_IMAGE) $(WEBSERVER_DIR)

build-minishell:
	docker build -t $(MINISHELL_IMAGE) $(MINISHELL_DIR)

up: build-webserver build-minishell
	$(COMPOSE) up --build -d

down:
	$(COMPOSE) down

restart: down up

logs:
	$(COMPOSE) logs -f

ps:
	$(COMPOSE) ps

clean:
	$(COMPOSE) down --remove-orphans

fclean:
	$(COMPOSE) down --volumes --remove-orphans
	docker image prune -f

clean-all:
	docker stop $$(docker ps -q) 2>/dev/null || true
	docker rm $$(docker ps -aq) 2>/dev/null || true
	docker rmi -f $$(docker images -aq) 2>/dev/null || true
	docker system prune -f --volumes

re: fclean up
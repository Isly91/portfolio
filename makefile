NAME = portfolio

COMPOSE = docker compose
COMPOSE_PROD = docker compose -f docker-compose.prod.yml

WEBSERVER_IMAGE = isly-webserver:latest
WEBSERVER_DIR = ./webserver-backend/webserver

MINISHELL_IMAGE = isly-minishell:latest
MINISHELL_DIR = ./minishell-backend/sandbox

.PHONY: all build up up-prod down down-prod restart logs ps clean fclean clean-all re

all: up

build: build-webserver build-minishell
	$(COMPOSE) build

build-webserver:
	docker build -t $(WEBSERVER_IMAGE) $(WEBSERVER_DIR)

build-minishell:
	docker build -t $(MINISHELL_IMAGE) $(MINISHELL_DIR)

# ===== Development =====

up: build-webserver build-minishell
	$(COMPOSE) up --build -d

down:
	$(COMPOSE) down

restart: down up

# ===== Production =====

up-prod: build-webserver build-minishell
	$(COMPOSE_PROD) up --build -d

down-prod:
	$(COMPOSE_PROD) down

# ===== Utilities =====

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
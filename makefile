NAME = portfolio

COMPOSE = docker compose
WEBSERVER_IMAGE = isly-webserver:latest
WEBSERVER_DIR = ./webserver-backend/webserver

.PHONY: all build build-webserver up down restart logs ps clean fclean clean-all re

all: up

build: build-webserver
	$(COMPOSE) build

build-webserver:
	docker build -t $(WEBSERVER_IMAGE) $(WEBSERVER_DIR)

up: build-webserver
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
	docker system prune -f --volumes

re: fclean up
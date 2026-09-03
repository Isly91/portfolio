NAME = portfolio

COMPOSE = docker compose

.PHONY: all build up down restart logs ps clean fclean re

all: up

build:
	$(COMPOSE) build

up:
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

re: fclean up
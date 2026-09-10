FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       build-essential \
       ca-certificates \
       python3 \
	   curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/webserver

COPY project/ .

RUN make fclean && make

RUN useradd --create-home --shell /bin/bash sandbox \
    && chown -R sandbox:sandbox /opt/webserver

USER sandbox

EXPOSE 7000

CMD ["./webserv"]
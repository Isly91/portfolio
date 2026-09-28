FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        clang \
        make \
        ca-certificates \
        git \
        curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /opt/webserver

RUN git clone --depth 1 https://github.com/Isly91/PersonalWebServer.git .

RUN make fclean && make

RUN useradd --create-home --shell /bin/bash sandbox && \
    chown -R sandbox:sandbox /opt/webserver

USER sandbox
WORKDIR /opt/webserver

ENTRYPOINT ["./webserv", "./configs/simplem.conf"]
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       build-essential \
       libreadline-dev \
       ca-certificates \
       git \
       coreutils \
       grep \
       sed \
       bash \
       file \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/minishell

RUN git clone --depth 1 https://github.com/Isly91/minishell.git .

RUN make fclean && make

RUN useradd --create-home --shell /bin/bash sandbox \
    && chown -R sandbox:sandbox /opt/minishell

USER sandbox

WORKDIR /opt/minishell

ENTRYPOINT ["/bin/bash", "-c", "exec ./minishell"]

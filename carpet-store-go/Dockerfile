FROM golang:1.22

RUN useradd -u 10001 appuser
USER appuser

COPY ./carpet.db /
COPY ./go.mod /
COPY ./server.go /
EXPOSE 8080
ENTRYPOINT ["go", "run", "server.go"]
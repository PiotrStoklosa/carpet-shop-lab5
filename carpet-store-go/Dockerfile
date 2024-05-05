FROM golang:1.22

RUN useradd -u 10001 appuser

RUN mkdir -p /home/appuser && \
    chown -R appuser:appuser /home/appuser

USER appuser

COPY ./carpet.db .
COPY ./go.mod .
COPY ./server.go .
COPY ./go.sum .

RUN go mod download
EXPOSE 8080
ENTRYPOINT ["go", "run", "server.go"]
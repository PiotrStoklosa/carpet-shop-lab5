FROM golang:1.22
COPY ./carpet.db /
COPY ./go.mod /
COPY ./server.go /
EXPOSE 8080
ENTRYPOINT ["go", "run", "server.go"]
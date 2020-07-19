FROM golang:1.14-alpine

RUN apk add --no-cache git mercurial \
    && go get github.com/githubnemo/CompileDaemon \
    && apk del git mercurial

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY ./ /app

ENTRYPOINT CompileDaemon --build="go build src/app.go" --command=./app


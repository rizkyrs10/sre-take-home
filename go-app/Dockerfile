From golang:1.22-alpine AS builder

WORKDIR /app

Copy . .

RUN go build -o main .

CMD ["./main"]

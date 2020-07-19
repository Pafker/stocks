package main

import (
    "fmt"
    "net/http"
    "context"
    "encoding/json"
	
	"github.com/go-redis/redis/v8"
)

var ctx = context.Background()

func main() {
    http.HandleFunc("/stocks", GetStocks)
    http.ListenAndServe(":3003", nil)
}

func GetStocks(w http.ResponseWriter, r *http.Request) {
    rdb := redis.NewClient(&redis.Options{
        Addr:     "redis:6379",
        Password: "",
        DB:       0,
    })
    
    val, err := rdb.Keys(ctx, "*").Result()
    if err == redis.Nil {
        fmt.Println("does not exist")
    } else if err != nil {
        panic(err)
    }
    json, _ := json.Marshal(val)

    fmt.Fprintf(w, "%s", json)
}
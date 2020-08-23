package main

import (
    "fmt"
    "os"
    "net/http"
    "context"
    "encoding/json"
	
    "github.com/go-redis/redis/v8"
    finnhub "github.com/Finnhub-Stock-API/finnhub-go"
)

var ctx = context.Background()

func main() {
    http.HandleFunc("/stocks", GetStocks)
    http.ListenAndServe(":3003", nil)
}

func GetStocks(w http.ResponseWriter, r *http.Request) {
    rdb := redis.NewClient(&redis.Options{
        Addr:     os.Getenv("REDIS_URL"),
        Password: "",
        DB:       0,
    })

    finnhubClient := finnhub.NewAPIClient(finnhub.NewConfiguration()).DefaultApi
    auth := context.WithValue(context.Background(), finnhub.ContextAPIKey, finnhub.APIKey{
		Key: os.Getenv("FINNHUB_API_KEY"),
    })

    quote, _, err := finnhubClient.Quote(auth, "TEST")
	fmt.Printf("%+v\n", quote)
    
    val, err := rdb.Keys(ctx, "*").Result()
    if err == redis.Nil {
        fmt.Println("does not exist")
    } else if err != nil {
        panic(err)
    }
    json, _ := json.Marshal(val)

    fmt.Fprintf(w, "%s", json)
}
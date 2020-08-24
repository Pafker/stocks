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

type StockQuote struct {
    Name string `json:"name"`
    Quote finnhub.Quote `json:"quote"`
}

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
    
    keys, err := rdb.Keys(ctx, "*").Result()
    if err == redis.Nil {
        fmt.Println("does not exist")
    } else if err != nil {
        panic(err)
    }

    stocks := []StockQuote{}
    for _, s := range keys {
        quote, _, _ := finnhubClient.Quote(auth, s)
        stockQuote := &StockQuote{Name: s, Quote: quote}

        stocks = append(stocks, *stockQuote)
    }

    json, _ := json.Marshal(stocks)
    fmt.Fprintf(w, "%s", json)
}
package main

import (
	"fmt"
	"context"
	
	"github.com/go-redis/redis/v8"
)

var ctx = context.Background()

func main() {
	rdb := redis.NewClient(&redis.Options{
        Addr:     "redis:6379",
        Password: "",
        DB:       0,
    })

	key := "key";

    val, err := rdb.Get(ctx, key).Result()
	if err == redis.Nil {
        fmt.Println(key, "does not exist")
    } else if err != nil {
        panic(err)
    } else {
        fmt.Println("key", val)
    }
}
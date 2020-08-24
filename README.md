# Stocks

## Overview

This is sample project, used to extend personal skills with new/unused technologies. Allows to maintain a list of observed stocks and displays current information about them.

#### Http Service

Serves main view for user and handles user requests. Posts stocks events on message queue. 

#### Stocks Service

Handles stocks events from message queue. Adds/deletes stocks from observed list, persisted on Redis.

#### Finnhub Service

Creates client for finnhub api. Receives list of observed stocks from Redis, gathers stock information about them and returns to client.

##### Technologies

- Docker
- Deno
- TypeScript
- Go
- Redis
- RabbitMQ
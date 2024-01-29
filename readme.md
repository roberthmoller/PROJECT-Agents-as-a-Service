# Agents as a Service


## Todo
 - [ ] Feature testing
 - [ ] Playwright testing
 - [ ] Unit testing
 - [ ] Integration testing

## Resources 


[CosmoDB emulator](https://learn.microsoft.com/en-us/azure/cosmos-db/how-to-develop-emulator?tabs=docker-linux%2Ccsharp&pivots=api-nosql)
```sh 
docker run \
--publish 8081:8081 \
--publish 10250-10255:10250-10255 \
--interactive \
--tty \
mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator:latest
```

.PHONY: run
run: ## Build and run the application
	go run .

.PHONY: build
build: ## Build the binary
	go build .

.PHONY: start-docker-env
start-docker-env: ## Start docker containers from docker compose
	docker-compose up -d --build

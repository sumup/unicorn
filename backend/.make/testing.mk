.PHONY: lint
lint: ensure-lint ## Lint the application
	golangci-lint run --max-same-issues=0 --timeout=3m ./...;

.PHONY: test
test: ## Runs all unit tests
	go test -failfast -race ./...

.PHONY: create-migration
create-migration: ## create a new migration
ifdef name
	@migrate create -ext sql -dir migrations/ -seq -digits 6 $(name)
else
	@echo "Missing migration name. Usage: `make create-migration name=<migration-name>`"
endif

.PHONY: test-migrate-up
test-migrate-up: ensure-migrate ## Test migrations in the up direction
	migrate -source file://migrations -database "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable" up

.PHONY: test-migrate-down
test-migrate-down: ensure-migrate ## Test migrations in the down direction
	migrate -source file://migrations -database "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable" down -all

.PHONY: test-migrations
test-migrations: ensure-migrate test-migrate-up test-migrate-down test-migrate-up

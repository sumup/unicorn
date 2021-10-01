package main

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/sumup/unicorn/backend/pkg/api"
	"github.com/sumup/unicorn/backend/pkg/config"
	"github.com/sumup/unicorn/backend/pkg/db"
	"github.com/sumup/unicorn/backend/pkg/graph"
	"github.com/sumup/unicorn/backend/pkg/server"
)

func main() {
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})

	cfg, err := config.Load()
	if err != nil {
		log.Fatal().Err(err).Msg("failed to load config")
	}

	database, err := db.NewDB(cfg.Database)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to create database connection")
	}

	srv := server.NewServer()

	resolver := graph.NewResolver(db.NewEmployeeRepository(database.DB))
	api := api.NewAPI(resolver.Schema())
	api.RegisterHandlers(srv.Echo.Group("/api"))

	// setup channel to handle shutdown requests
	shutdownChan := make(chan os.Signal, 1)

	// Start server
	addr := fmt.Sprintf(":%v", cfg.Port)
	log.Info().Msgf("starting unicorn with addr %v", addr)
	go func() {
		if err := srv.Start(addr); err != nil && err != http.ErrServerClosed {
			log.Error().Err(err).Msg("unexpected http server close")
		} else {
			log.Info().Msg("http server closed")
		}

		// send a signal if the server died
		shutdownChan <- syscall.SIGABRT
	}()

	signal.Notify(shutdownChan, syscall.SIGTERM, syscall.SIGINT)
	sig := <-shutdownChan
	log.Info().Msgf("received %s, gracefully shutting down", sig.String())

	if err := srv.Shutdown(); err != nil {
		log.Fatal().Err(err).Msg("failed to shut down server")
	}
	log.Info().Msg("unicorn backend shut down")
}

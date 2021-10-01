package server

import (
	"context"
	"fmt"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/rs/zerolog/log"
)

const shutdownTimeout = 10 * time.Second

type Server struct {
	Echo *echo.Echo
}

func NewServer() *Server {
	e := echo.New()
	e.HideBanner = true

	echoLogger := log.With().Str("component", "echo").Logger()

	e.Logger.SetOutput(echoLogger)
	e.StdLogger.SetOutput(echoLogger)

	return &Server{
		Echo: e,
	}
}

func (srv *Server) Start(addr string) error {
	return srv.Echo.Start(addr)
}

func (srv *Server) Shutdown() error {
	ctx, cancel := context.WithTimeout(context.Background(), shutdownTimeout)
	defer cancel()

	if err := srv.Echo.Shutdown(ctx); err != nil {
		if closeErr := srv.Echo.Close(); closeErr != nil {
			return fmt.Errorf("shutting down %v and closing server: %v", err, closeErr)
		}

		return fmt.Errorf("shutting down server: %v", err)
	}

	return nil
}

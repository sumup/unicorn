package db

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	gormpostgres "gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/sumup/unicorn/backend/pkg/config"
	"github.com/sumup/unicorn/backend/pkg/domain"
)

type DB struct {
	DB     *gorm.DB
	Raw    *sql.DB
	Config config.Database
}

const migrationPath = "migrations"

func NewDB(c config.Database) (*DB, error) {
	connStr := newConnStr(c)
	db, err := gorm.Open(gormpostgres.Open(connStr), &gorm.Config{
		Logger: &zerologAdapter{
			log.With().Str("component", "gorm").Logger(),
		},
	})
	if err != nil {
		return nil, fmt.Errorf("open database: %v", err)
	}

	err = db.
		// 	Session(&gorm.Session{
		// 		DryRun: true,
		// 		Logger: &zerologAdapter{
		// 			log.With().Str("component", "gorm").Logger(),
		// 		},
		// 	}).
		AutoMigrate(&domain.Employee{})
	if err != nil {
		return nil, err
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("get raw db: %v", err)
	}

	err = migrateDB(sqlDB, migrationPath)
	if err != nil {
		return nil, fmt.Errorf("migrate database: %v", err)
	}

	return &DB{
		DB:     db,
		Raw:    sqlDB,
		Config: c,
	}, nil
}

func migrateDB(db *sql.DB, migrationPath string) error {
	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return fmt.Errorf("create postgres driver: %v", err)
	}

	mPath := fmt.Sprintf("file://%s", migrationPath)
	m, err := migrate.NewWithDatabaseInstance(mPath, "postgres", driver)
	if err != nil {
		return fmt.Errorf("create migrate instance: %v", err)
	}

	if err := m.Up(); err != nil && !errors.Is(err, migrate.ErrNoChange) {
		return fmt.Errorf("migrate up: %v", err)
	}

	return nil
}

func newConnStr(c config.Database) string {
	return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		c.Host,
		c.Port,
		c.Username,
		c.Password,
		c.Database,
	)
}

type zerologAdapter struct {
	logger zerolog.Logger
}

func toZerologLevel(level logger.LogLevel) zerolog.Level {
	switch level {
	case logger.Silent:
		return zerolog.Disabled
	case logger.Info:
		return zerolog.InfoLevel
	case logger.Error:
		return zerolog.ErrorLevel
	case logger.Warn:
		return zerolog.WarnLevel
	}
	return zerolog.NoLevel
}

func (z *zerologAdapter) LogMode(level logger.LogLevel) logger.Interface {
	l := toZerologLevel(level)

	return &zerologAdapter{
		logger: z.logger.Level(l),
	}
}

func (z *zerologAdapter) Info(ctx context.Context, s string, i ...interface{}) {
	z.logger.Info().Msgf(s, i...)
}

func (z *zerologAdapter) Warn(ctx context.Context, s string, i ...interface{}) {
	z.logger.Warn().Msgf(s, i...)
}

func (z *zerologAdapter) Error(ctx context.Context, s string, i ...interface{}) {
	z.logger.Error().Msgf(s, i...)
}

func (z *zerologAdapter) Trace(ctx context.Context, begin time.Time, fc func() (sql string, rowsAffected int64), err error) {
	sql, rowsAffected := fc()
	z.logger.Debug().Err(err).Str("sql", sql).Int64("rows_affected", rowsAffected).Msg("gorm trace")
}

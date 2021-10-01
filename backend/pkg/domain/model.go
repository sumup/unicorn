package domain

import (
	"time"

	"github.com/google/uuid"
)

type Model struct {
	ID        uuid.UUID  `json:"id" gorm:"primarykey"`
	CreatedAt time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
	DeletedAt *time.Time `json:"deleted_at" gorm:"index"`
}

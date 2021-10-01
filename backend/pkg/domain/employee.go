package domain

import "fmt"

type Employee struct {
	Model
	FirstName string  `json:"first_name"`
	LastName  string  `json:"last_name"`
	JobTitle  string  `json:"job_title"`
	Location  *string `json:"location"`

	Email string `json:"email"`

	SlackHandle string `json:"slack_handle"`
	SlackID     string `json:"slack_id"`
}

func (e *Employee) FullName() string {
	return fmt.Sprintf("%s %s", e.FirstName, e.LastName)
}

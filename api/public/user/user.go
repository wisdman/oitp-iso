package main

type User struct {
	Id string `json:"id"`

	Email        *string `json:"email"`
	EmailIsValid bool    `json:"emailIsValid"`

	Phone        *string `json:"phone"`
	PhoneIsValid bool    `json:"phoneIsValid"`

	Name    string `json:"name"`
	Surname string `json:"surname"`

	Avatar *string `json:"avatar"`
}

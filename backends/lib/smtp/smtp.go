package smtp

import (
	"bytes"
	"crypto/tls"
	"fmt"
	"html/template"
	"log"
	"net/mail"
	"net/smtp"
	"strconv"
)

type SMTP struct {
	Auth       smtp.Auth
	TLS        *tls.Config
	Servername string
	From       mail.Address
	Template   *template.Template
}

func New(tpl string) *SMTP {
	config, err := parseEnv()
	if err != nil {
		log.Fatalln(err)
	}

	return &SMTP{
		Auth: smtp.PlainAuth("", config.User, config.Password, config.Server),
		TLS: &tls.Config{
			InsecureSkipVerify: true,
			ServerName:         config.Server,
		},
		Servername: config.Server + ":" + strconv.Itoa(int(config.Port)),
		From:       mail.Address{config.Name, config.From},
		Template:   template.Must(template.New("Template").Parse(tpl)),
	}
}

func (s *SMTP) Send(to string, subj string, data interface{}) error {

	xTo := mail.Address{"", to}

	// Setup headers
	headers := make(map[string]string)
	headers["From"] = s.From.String()
	headers["To"] = xTo.String()
	headers["Subject"] = subj
	headers["MIME-version"] = "1.0;"
	headers["Content-Type"] = "text/html; charset=\"UTF-8\";"

	var body bytes.Buffer
	if err := s.Template.Execute(&body, data); err != nil {
		return err
	}

	message := ""
	for k, v := range headers {
		message += fmt.Sprintf("%s: %s\r\n", k, v)
	}
	message += "\r\n" + body.String()

	c, err := smtp.Dial(s.Servername)
	if err != nil {
		return err
	}
	defer c.Quit()

	c.StartTLS(s.TLS)

	if err = c.Auth(s.Auth); err != nil {
		return err
	}

	if err = c.Mail(s.From.Address); err != nil {
		return err
	}

	if err = c.Rcpt(xTo.Address); err != nil {
		return err
	}

	// Data
	w, err := c.Data()
	if err != nil {
		return err
	}

	_, err = w.Write([]byte(message))
	if err != nil {
		return err
	}

	err = w.Close()
	if err != nil {
		return err
	}

	return nil
}

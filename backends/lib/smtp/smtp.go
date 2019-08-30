package smtp

import (
	"bytes"
	"crypto/tls"
	"errors"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/mail"
	"net/smtp"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
)

var subjRx = regexp.MustCompile(`<title>([^<]+)`)

type SMTP struct {
	Auth       smtp.Auth
	TLS        *tls.Config
	Servername string
	From       mail.Address
	Templates  map[string]*template.Template
}

func New() *SMTP {
	config, err := parseEnv()
	if err != nil {
		log.Fatalln(err)
	}

	mailer := &SMTP{
		Auth: smtp.PlainAuth("", config.User, config.Password, config.Server),
		TLS: &tls.Config{
			InsecureSkipVerify: true,
			ServerName:         config.Server,
		},
		Servername: config.Server + ":" + strconv.Itoa(int(config.Port)),
		From:       mail.Address{config.Name, config.From},
		Templates:  make(map[string]*template.Template),
	}

	templatePath, err := filepath.Abs(config.TemplatesDir)
	if err != nil {
		log.Fatalln(err)
	}

	files, err := ioutil.ReadDir(templatePath)
	if err != nil {
		log.Fatalln(err)
	}

	for _, f := range files {
		if f.IsDir() || filepath.Ext(f.Name()) != ".html" {
			continue
		}
		filePath := filepath.Join(templatePath, f.Name())
		templateName := strings.TrimSuffix(f.Name(), filepath.Ext(f.Name()))
		mailer.Templates[templateName] = template.Must(template.ParseFiles(filePath))
	}

	return mailer
}

func (s *SMTP) AddTemplate(templateName string, tpl string) {
	s.Templates[templateName] = template.Must(template.New(templateName).Parse(tpl))
}

func (s *SMTP) Send(templateName string, to string, toName string, subj string, data interface{}) error {

	xTo := mail.Address{toName, to}

	headers := make(map[string]string)
	headers["From"] = s.From.String()
	headers["To"] = xTo.String()
	headers["MIME-version"] = "1.0;"
	headers["Content-Type"] = "text/html; charset=\"UTF-8\";"

	tpl, ok := s.Templates[templateName]
	if ok != true {
		return errors.New("Incorrect template name")
	}

	var body bytes.Buffer
	if err := tpl.Execute(&body, data); err != nil {
		return err
	}

	if subj != "" {
		headers["Subject"] = subj
	} else {
		strs := subjRx.FindStringSubmatch(body.String())
		if len(strs) == 0 {
			return errors.New("Incorrect Subject")
		}
		headers["Subject"] = strs[1]
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

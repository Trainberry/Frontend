<pre><code>
    openapi: 3.0.3
    info:
      title: Mail API
      description: This API is designed to allow students to send emails to uca emails during their Middleware course.
      termsOfService: https://edu.forestier.re
      contact:
        email: florian.forestier@ext.uca.fr
      license:
        name: Do What The Fuck You Want To Public Licence
        url: http://www.wtfpl.net/about/
      version: 1.0.0
    servers:
      - url: https://mail-api.edu.forestier.re
    paths:
      /tokens:
        post:
          tags:
            - tokens
          summary: Create a token
          requestBody:
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    email: 
                      type: string
          responses:
            '204':
              description: Successful operation - See your inbox
        delete:
          tags:
            - tokens
          summary: Revoke current token
          security:
            - base: []
          responses:
            '204':
              description: Token revoked
      /validate:
        post:
          tags:
            - tokens
          summary: Validate a token
          requestBody:
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    email:
                      type: string
                    token:
                      type: string
          responses:
            '204':
              description: Activated - See your inbox to get real token
      /mail:
        post:
          tags:
            - mails
          summary: Send an email
          requestBody:
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    recipient:
                      type: string
                    subject:
                      type: string
                    content:
                      type: string
          security:
            - base: []
          responses:
            '204':
              description: Mail sent
    components:
      securitySchemes:
        base:
          type: apiKey
          name: Authorization
          in: header
</code></pre>
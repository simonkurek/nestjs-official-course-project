# Ideas for using NestJS building blocks for app

## Logging

> Logging can be implemented as NestJS interceptor
> Logging might have

- before request
  - request id
  - timestamp
  - request body
  - path
  - method
  - ip
  - user agent
  - language
  - location
  - headers
  - version number
  - etc
- after request (request id, timestamp, response body)
  - request id
  - timestamp
  - response body
  - http status

## Support with bugs

> Support with bugs can be implemented as request id with NestJS HttpException returing request id and timestamp

## Statistics / monitoring

#### From data collected by logging

- Most used endpoints
- Most popular location
- Top time consuming endpoints
- Time when api is used the most
- Most popular user agent (and os)
- Most popular languages (useful for product globalizaion)
- Version number (ex. api versions)
- Good to bad requests
- Bad requests per person
- Attact detect (a lots of bad request in short time per person or from ip pool)
- Requests per x (hour, day, month)
- Top active users (ex. for bot detection)

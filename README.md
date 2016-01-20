# TwilioForwarder
simple server that forwards messages received at a twilio number to slack

## Instructions

1. Set the environment variable SLACK_WEBHOOK_URL to the webhook url in the slack integration

2. Configure Twilio's Request URL for the number in question to be `http://<this-server-url>/twilio`, method `POST`
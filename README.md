# Facebook-event-tracker

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Armitage35/facebook-event-tracker/graphs/commit-activity)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Armitage35/facebook-event-tracker/blob/dev/LICENSE)
[![CodeFactor](https://www.codefactor.io/repository/github/armitage35/facebook-event-tracker/badge)](https://www.codefactor.io/repository/github/armitage35/facebook-event-tracker)

## What is it

This tool lets you parse Facebook pages to track their events. This is very useful for both terminal nerds as well as for people who just don't have a Facebook account but still want to keep track of upcoming events.

## How is it built

This project runs Puppeteer behind the scenes. *It is not the best way to do this*, but getting access to this API means I would need to set up a company, so that was the second-best way to do it.

## Key features

This app lets you declare which pages to track and get upcoming, recurring and past events.

## How to use

1. Install dependancies using `yarn`
1. Run `yarn start`

### Create a permanant shortcut to the app

1. Open `~/.bashrc` or `~/.zshrc`
1. Add `alias facebook-event-tracker='node {WHERE YOU INSTALLED THE APP}/facebook-event-tracker/cli.js'` in your alias section
1. Refresh your settings by running source `~/.bashrc` or source `~/.zshrc`
1. Run `facebook-event-tracker`

---
Brought to you by [Armitage](https://armitageweb.net) and made with :heart: in beautiful Montreal

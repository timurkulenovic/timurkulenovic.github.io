---
title: "Calendars"
description: "Timur Kulenović - portfolio"
---

Subscribable iCalendar feeds generated from public sports schedules. Subscribe in Apple Calendar, Google Calendar, or Outlook — your client pulls updates automatically.

## ABA Liga

Match dates scraped from the [ABA Liga calendar](https://www.aba-liga.com/calendar/26/1/) and published as per-team `.ics` feeds. A GitHub Action refreshes the source daily, so subscribers always see the latest schedule.

- **Picker page:** [kulenovic.si/aba-league-calendar](https://timurkulenovic.github.io/aba-league-calendar/)
- **All matches:** `webcal://timurkulenovic.github.io/aba-league-calendar/ics/all.ics`
- **Per team:** `webcal://timurkulenovic.github.io/aba-league-calendar/ics/<team-slug>.ics`
  - e.g. `cedevita-olimpija.ics`, `perspektiva-ilirija.ics`, `partizan-mozzart-bet.ics`
- **Source:** [github.com/timurkulenovic/aba-league-calendar](https://github.com/timurkulenovic/aba-league-calendar)

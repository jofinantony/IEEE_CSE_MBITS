# Data Model & Entity Relations

```
  +------------------+         +-------------------+
  |   Technologies   |<------->|    Build Lab      |
  |  (Adopt/Trial/   |         |    (Projects)     |
  |   Assess/Hold)   |         +-------------------+
  +--------+---------+                   ^
           |                             |
           v                             v
  +------------------+         +-------------------+
  |  Event Timeline  |<------->|  ExeCom Leadership|
  |  (Past/Upcoming) |         |  (Advisory/Leads) |
  +--------+---------+         +-------------------+
           |                             |
           v                             v
  +------------------+         +-------------------+
  |  Achievements    |         |  Open Resources   |
  |  (SIH, IEEE DOI) |         |  (Roadmaps, Kits) |
  +------------------+         +-------------------+
```

## Entity Specifications
1. **Technology**: `id`, `name`, `category` (AI, Web, Cyber, Data, Cloud, IoT, Systems), `ring` (Adopt, Trial, Assess, Hold), `relatedProjectIds`, `relatedEventIds`.
2. **EventItem**: `id`, `title`, `date`, `time`, `venue`, `category`, `description`, `speaker` (name, role, affiliation), `whatYouWillLearn`, `whoShouldAttend`, `status`, `technologies`, `timelineStatus`, `seatsRemaining`.
3. **ProjectItem**: `id`, `name`, `tagline`, `category`, `problem`, `build`, `technologies`, `process`, `result`, `team`, `githubUrl`, `demoUrl`, `status`.
4. **ExecomMember**: `id`, `name`, `role`, `tier` (Advisory, Executive, Domain Lead), `department`, `year`, `bio`, `responsibilities`, `avatarFallback`, `email`, `linkedin`, `github`, `projectsLed`.
5. **AchievementItem**: `id`, `year`, `title`, `category`, `description`, `recipient`, `verificationBadge`.
6. **ResourceItem**: `id`, `title`, `type`, `category`, `description`, `link`, `author`.

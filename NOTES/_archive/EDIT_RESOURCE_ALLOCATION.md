# Terrafarm Software Documentation

## Edit Resource Allocation

### Permission logic for editing a resource allocation

- if status is [offered]
  - any user, show action panel "This resource was offered to this organization"
  - if organization member, show 'review' form
  - if owner, show 'delete' button
- if status is [requested]
  - any user, show action panel "This resource was requested by this organization"
  - if owner, show 'review' form
  - if organization member, show 'delete' button
- if status is [accepted]
  - any user, show action panel "This resource is accepted into this organization"
  - if owner or organization member, show 'delete' button
- if status is [declined]
  - any user, show action panel "This resource is declined for this organization"
  - if owner or organization member, show 'delete' button

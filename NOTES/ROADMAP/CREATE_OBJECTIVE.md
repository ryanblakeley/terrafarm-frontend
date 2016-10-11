# Terrafarm Frontend Roadmap

## Create Objective

On the profile page for the logged in user, change the left action tab for 'new land'
to 'new objective'
- replace icon with ion-ios-list

When it is clicked open, show the following user flow:
```
o Organization
  - Foo Group
  - Bar Squad
  [New organization name]
> Project
> Task
```
**If a new organization is entered:**
- keep 'project' and 'task' disabled
- show fields for new organization
```
> Organization
  Baz patrol
> Project
> Task

<fields>
```
If an existing organization is selected:
- open the 'project' input
```
> Organization
  Foo Group
o Project
  - Compost stuff
  [New project name]
> Task
```
**If a new project is entered:**
- keep 'task' disabled
- show fields for new project
```
> Organization
  Foo Group
> Project
  Bee colony
> Task

<new project fields>
```
If an existing project is selected:
- open the 'task' input
- show fields for new task
```
> Organization
  Foo Group
> Project
  Compost stuff
o Task
  [New task name]

<new task fields>
```
**If the new task name is in conflict with existing, invalidate form**

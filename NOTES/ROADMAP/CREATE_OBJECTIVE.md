# Terrafarm Frontend Roadmap

## Create Objective

When it is clicked open, show the following user flow:
```
o Organization
  - Foo Group
  - Bar Squad
  [New organization name]
> Project (disabled)
> Task (disabled)
```
**If a new organization is entered:**
- keep 'project' and 'task' disabled
- show fields for new organization
```
> Organization
  [Baz Farm]
> Project (disabled)
> Task (disabled)

<new organization fields>
```
If an existing organization is selected:
- open the 'project' input
```
> Organization
  Foo Group
o Project
  - Compost stuff
  [New project name]
> Task (disabled)
```
**If a new project is entered:**
- keep 'task' disabled
- show fields for new project
```
> Organization
  Foo Group
> Project
  [Bee colony]
> Task (disabled)

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

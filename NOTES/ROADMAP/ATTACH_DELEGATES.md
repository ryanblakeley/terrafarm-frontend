# Terrafarm Frontend Roadmap

## Attach Delegates

This is a design document for new data relationships and a new db schema.

Tasks can connect to multiple projects, and projects can connect to multiple tasks.
Connecting a task to a project enables the project author to delegate resources
to the task. Connecting a project to an organization allows the organization
members to delegate resources to the project.

Maybe we will have a new resource allocation lifecycle status 'delegated'.

The only time delegation is possible is an organization member delegating an
organization resource to an organization project: or a project author delegating
a project resource to a project task.

To create a connection, on the Project page, have an attach-organization form,
and on the Task page, have an attach-project form. Show list including recently
viewed projects, liked projects, projects where current person is author. Show a
list with similar parameters for selecting an organization to attach to a project.

In the NewProject and NewTask forms, have an "attach to..." selection menu.

### Detaching

...

# Terrafarm Software Documentation

## Resource Allocation Lifecycle

User creates resources. Another user creates organization, project, or task.
Resource owner offers or organization member requests a resource. The other party
accepts or declines the allocation.

If a user goes to offer a resource and doesn't have any saved in his profile, we
show a warning message and do not show the form. Otherwise, the form consists of
a single select input with a menu of resources that the current person has created
in the app.

If a user goes to request a resource and is not a member of any organizations,
we show a warning message and do not show the form. Otherwise, the form consists
of a radio group with three options: Organization, Project, Task. This selection
controls which select input is shown. Each select input has a menu of items.

The items that are shown for the organization list are those in which the current
person is a member. The projects are all those which are created under those organizations.
The tasks are all those which are created under those projects.
